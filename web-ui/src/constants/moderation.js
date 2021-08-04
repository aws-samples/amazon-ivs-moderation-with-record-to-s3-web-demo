
export const defaultModerationValue = {
  ALERT: '50',
  ACTION: '99',
}

export const moderationTypes = {
  ALERT: 'alert',
  ACTION: 'action'
}

export const moderationGroup = [
  {
    group: "Explicit Nudity",
    groupId: "explicit_nudity",
    settings: [
      { label: "Nudity", field: "nudity" },
      { label: "Graphic Male Nudity", field: "graphic_male_nudity" },
      { label: "Graphic Female Nudity", field: "graphic_female_nudity" },
      { label: "Sexual Activity", field: "sexual_activity" },
      {
        label: "Illustrated Explicit Nudity",
        field: "illustrated_explicit_nudity",
      },
      { label: "Adult Toys", field: "adult_toys" },
    ],
  },
  {
    group: "Suggestive",
    groupId: "suggestive",
    settings: [
      { label: "Partial Nudity", field: "partial_nudity" },
      { label: "Revealing Clothes", field: "revealing_clothes" },
      {
        label: "Female Swimwear or Underwear",
        field: "female_swimwear_or_underwear",
      },
      {
        label: "Male Swimwear or Underwear",
        field: "male_swimwear_or_underwear",
      },
      { label: "Sexual Situations", field: "sexual_situations" },
    ],
  },
  {
    group: "Violence",
    groupId: "violence",
    settings: [
      { label: "Weapons", field: "weapons" },
      { label: "Weapon Violence", field: "weapon_violence" },
      {
        label: "Physical Violence",
        field: "physical_violence",
      },
      {
        label: "Graphic Violence Gore",
        field: "graphic_violence_gore",
      },
    ],
  },
  {
    group: "Visually Disturbing",
    groupId: "visually_disturbing",
    settings: [
      { label: "Emaciated Bodies", field: "emaciated_bodies" },
      { label: "Corpses", field: "corpses" },
      { label: "Hanging", field: "hanging" },
      { label: "Air Crash", field: "air_crash" },
      { label: "Explosions And Blasts", field: "explosions_and_blasts" },
    ],
  },
  {
    group: "Rude Gestures",
    groupId: "rude_gestures",
    settings: [{ label: "Middle Finger", field: "middle_finger" }],
  },
  {
    group: "Drugs",
    groupId: "drugs",
    settings: [
      { label: "Drug Use", field: "drug_use" },
      { label: "Drug Products", field: "drug_products" },
      { label: "Pills", field: "pills" },
      { label: "Drug Paraphernalia", field: "drug_paraphernalia" },
    ],
  },
  {
    group: "Tobacco",
    groupId: "tobacco",
    settings: [
      { label: "Smoking", field: "smoking" },
      { label: "Tobacco Products", field: "tobacco_products" },
    ],
  },
  {
    group: "Alcohol",
    groupId: "alcohol",
    settings: [
      { label: "Drinking", field: "drinking" },
      { label: "Alcoholic Beverages", field: "alcoholic_beverages" },
    ],
  },
  {
    group: "Gambling",
    groupId: "gambling",
    settings: [{ label: "Gambling", field: "gambling" }],
  },
  {
    group: "Hate Symbols",
    groupId: "hate_symbols",
    settings: [
      { label: "Extremist", field: "extremist" },
      { label: "Nazi Party", field: "nazi_party" },
      { label: "White Supremacy", field: "white_supremacy" },
    ],
  },
];
