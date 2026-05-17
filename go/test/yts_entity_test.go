package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/youtube-video-sdk/go"
	"github.com/voxgig-sdk/youtube-video-sdk/go/core"

	vs "github.com/voxgig-sdk/youtube-video-sdk/go/utility/struct"
)

func TestYtsEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Yts(nil)
		if ent == nil {
			t.Fatal("expected non-nil YtsEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := ytsBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "yts." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set YOUTUBEVIDEO_TEST_YTS_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		ytsRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.yts", setup.data)))
		var ytsRef01Data map[string]any
		if len(ytsRef01DataRaw) > 0 {
			ytsRef01Data = core.ToMapAny(ytsRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = ytsRef01Data

		// LOAD
		ytsRef01Ent := client.Yts(nil)
		ytsRef01MatchDt0 := map[string]any{}
		ytsRef01DataDt0Loaded, err := ytsRef01Ent.Load(ytsRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if ytsRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func ytsBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "yts", "YtsTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read yts test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse yts test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"yts01", "yts02", "yts03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("YOUTUBEVIDEO_TEST_YTS_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"YOUTUBEVIDEO_TEST_YTS_ENTID": idmap,
		"YOUTUBEVIDEO_TEST_LIVE":      "FALSE",
		"YOUTUBEVIDEO_TEST_EXPLAIN":   "FALSE",
		"YOUTUBEVIDEO_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["YOUTUBEVIDEO_TEST_YTS_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["YOUTUBEVIDEO_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["YOUTUBEVIDEO_APIKEY"],
			},
			extra,
		})
		client = sdk.NewYoutubeVideoSDK(core.ToMapAny(mergedOpts))
	}

	live := env["YOUTUBEVIDEO_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["YOUTUBEVIDEO_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
