

export const listChannels = /* GraphQL */ `
query ListChannelss(
  $filter: ModelChannelsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChannelss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
      id
      num_flagged_images
      playback_url
      time
      flagged_images {
        time
        url
        moderation_results {
          label
          value
        }
      }
    }
      nextToken
    }
    
  }
`;
export const listSettings = /* GraphQL */ `
  query ListSettingss(
    $filter: ModelSettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSettingss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        explicit_nudity
        nudity
        graphic_male_nudity
        graphic_female_nudity
        sexual_activity
        illustrated_explicit_nudity
        adult_toys
        suggestive
        sexual_situations
        partial_nudity
        revealing_clothes
        female_swimwear_or_underwear
        male_swimwear_or_underwear
        violence
        graphic_violence_gore
        physical_violence
        weapon_violence
        weapons
        self_injury
        visually_disturbing
        emaciated_bodies
        corpses
        hanging
        air_crash
        explosions_and_blasts
        rude_gestures
        middle_finger
        drugs
        drug_products
        drug_use
        pills
        drug_paraphernalia
        tobacco
        tobacco_products
        smoking
        alcohol
        drinking
        alcoholic_beverages
        gambling
        hate_symbols
        nazi_party
        white_supremacy
        extremist
        _version
      }
      nextToken
    }
  }
`;