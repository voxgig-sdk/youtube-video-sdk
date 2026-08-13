# frozen_string_literal: true

# Typed models for the YoutubeVideo SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Yts entity data model.
#
# @!attribute [rw] channel
#   @return [String]
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] duration
#   @return [String]
#
# @!attribute [rw] thumbnail
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] uploaded
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] views
#   @return [Integer]
Yts = Struct.new(
  :channel,
  :description,
  :duration,
  :thumbnail,
  :title,
  :type,
  :uploaded,
  :url,
  :views,
  keyword_init: true
)

# Request payload for Yts#load.
#
# @!attribute [rw] channel
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [String, nil]
#
# @!attribute [rw] thumbnail
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] uploaded
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] views
#   @return [Integer, nil]
YtsLoadMatch = Struct.new(
  :channel,
  :description,
  :duration,
  :thumbnail,
  :title,
  :type,
  :uploaded,
  :url,
  :views,
  keyword_init: true
)

