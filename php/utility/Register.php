<?php
declare(strict_types=1);

// YoutubeVideo SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

YoutubeVideoUtility::setRegistrar(function (YoutubeVideoUtility $u): void {
    $u->clean = [YoutubeVideoClean::class, 'call'];
    $u->done = [YoutubeVideoDone::class, 'call'];
    $u->make_error = [YoutubeVideoMakeError::class, 'call'];
    $u->feature_add = [YoutubeVideoFeatureAdd::class, 'call'];
    $u->feature_hook = [YoutubeVideoFeatureHook::class, 'call'];
    $u->feature_init = [YoutubeVideoFeatureInit::class, 'call'];
    $u->fetcher = [YoutubeVideoFetcher::class, 'call'];
    $u->make_fetch_def = [YoutubeVideoMakeFetchDef::class, 'call'];
    $u->make_context = [YoutubeVideoMakeContext::class, 'call'];
    $u->make_options = [YoutubeVideoMakeOptions::class, 'call'];
    $u->make_request = [YoutubeVideoMakeRequest::class, 'call'];
    $u->make_response = [YoutubeVideoMakeResponse::class, 'call'];
    $u->make_result = [YoutubeVideoMakeResult::class, 'call'];
    $u->make_point = [YoutubeVideoMakePoint::class, 'call'];
    $u->make_spec = [YoutubeVideoMakeSpec::class, 'call'];
    $u->make_url = [YoutubeVideoMakeUrl::class, 'call'];
    $u->param = [YoutubeVideoParam::class, 'call'];
    $u->prepare_auth = [YoutubeVideoPrepareAuth::class, 'call'];
    $u->prepare_body = [YoutubeVideoPrepareBody::class, 'call'];
    $u->prepare_headers = [YoutubeVideoPrepareHeaders::class, 'call'];
    $u->prepare_method = [YoutubeVideoPrepareMethod::class, 'call'];
    $u->prepare_params = [YoutubeVideoPrepareParams::class, 'call'];
    $u->prepare_path = [YoutubeVideoPreparePath::class, 'call'];
    $u->prepare_query = [YoutubeVideoPrepareQuery::class, 'call'];
    $u->result_basic = [YoutubeVideoResultBasic::class, 'call'];
    $u->result_body = [YoutubeVideoResultBody::class, 'call'];
    $u->result_headers = [YoutubeVideoResultHeaders::class, 'call'];
    $u->transform_request = [YoutubeVideoTransformRequest::class, 'call'];
    $u->transform_response = [YoutubeVideoTransformResponse::class, 'call'];
});
