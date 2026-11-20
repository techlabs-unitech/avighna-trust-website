/**
 * Tīrtha Yātrā — regions of Bharat and the states under each.
 * Shared by the menu (client) and the page content (server), so it holds no heavy imports.
 *
 * `centres` lists well-known tīrthas of each state as a starting point for the Trust to review.
 * Itineraries and journey dates are announced by the Trust office.
 */

export type PilgrimageState = {
  slug: string;
  title: string;
  sa: string;
  /** One-line description for cards */
  text: string;
  /** Well-known sacred centres in the state (for review by the Trust) */
  centres: string[];
};

export type PilgrimageDirection = {
  slug: string;
  title: string;
  sa: string;
  saRoman: string;
  text: string;
  states: PilgrimageState[];
};

export const pilgrimageDirections: PilgrimageDirection[] = [
  {
    slug: "south-india",
    title: "South India",
    sa: "दक्षिणभारतम्",
    saRoman: "Dakṣiṇa Bhāratam",
    text: "The land of great gopurams and living temple traditions — Kerala, Tamil Nadu, Karnataka, Andhra Pradesh, Telangana, Maharashtra, Puducherry and Lakshadweep.",
    states: [
      {
        slug: "keralam",
        title: "Kerala",
        sa: "केरळम्",
        text: "Guided pilgrimages to ancient temple centres and sacred sites across Kerala, exploring their origins, traditions and spiritual heritage.",
        centres: ["Śrī Padmanābhaswāmī Temple, Thiruvananthapuram", "Guruvāyūr Śrī Kṛṣṇa Temple", "Śabarimala Śrī Dharmaśāstā Temple", "Vaikom Mahādeva Temple"],
      },
      {
        slug: "dravida-desham",
        title: "Tamil Nadu",
        sa: "द्रविडदेशम्",
        text: "Explorations of ancient temples across Tamil Nadu and the Dravida region, focusing on sacred architecture and historical significance.",
        centres: ["Mīnākṣī Amman Temple, Madurai", "Rāmanāthaswāmī Temple, Rameswaram", "Bṛhadīśvara Temple, Thanjavur", "Raṅganātha Temple, Śrīraṅgam"],
      },
      {
        slug: "karnataka-rajyam",
        title: "Karnataka",
        sa: "कर्णाटकराज्यम्",
        text: "Sacred visits to temples on riverbanks, such as the Tunga, and cultural centres across Karnataka.",
        centres: ["Śṛṅgeri Śāradā Pīṭham, on the Tunga", "Udupi Śrī Kṛṣṇa Maṭha", "Dharmasthala", "Kukke Subrahmaṇya"],
      },
      {
        slug: "andhra-pradesha",
        title: "Andhra Pradesh",
        sa: "आन्ध्रप्रदेशः",
        text: "Spiritual journeys to sacred pilgrimage sites and temples in Andhra Pradesh.",
        centres: ["Śrī Veṅkaṭeśvara Temple, Tirumala", "Śrīśailam Mallikārjuna Jyotirliṅga", "Simhācalam", "Kanaka Durgā Temple, Vijayawada"],
      },
      {
        slug: "maharashtra",
        title: "Maharashtra",
        sa: "महाराष्ट्रम्",
        text: "Jyotirliṅgas, the Aṣṭavināyaka shrines of Gaṇeśa and the Godāvarī at Nāsik.",
        centres: ["Aṣṭavināyaka shrines", "Trimbakeśvara Jyotirliṅga, Nāsik", "Bhīmaśaṅkara Jyotirliṅga", "Viṭṭhala Temple, Pandharpur"],
      },
      {
        slug: "telangana",
        title: "Telangana",
        sa: "तेलङ्गाना",
        text: "Sacred journeys to the hill shrines, river-bank temples and ancient temple towns of Telangana.",
        centres: ["Yādagirigutta Lakṣmī Narasiṁha Temple", "Bhadrācalam Śrī Sītārāmacandra Temple", "Vemulavāḍa Rājarājeśvara Temple", "Bāsara Jñāna Sarasvatī Temple"],
      },
      {
        slug: "puducherry",
        title: "Puducherry (Union Territory)",
        sa: "पुदुच्चेरी (केन्द्रशासितप्रदेशः)",
        text: "Temples of the Coromandel coast in the Union Territory of Puducherry, with Kāraikkāl and its Śani shrine.",
        centres: ["Maṇakkuḷa Vināyagar Temple, Puducherry", "Vedapurīśvarar Temple, Puducherry", "Tirunallāru Darbhāraṇyeśvarar Temple, Kāraikkāl"],
      },
      {
        slug: "lakshadweep",
        title: "Lakshadweep (Union Territory)",
        sa: "लक्षद्वीपम् (केन्द्रशासितप्रदेशः)",
        text: "The coral islands of the Arabian Sea, a Union Territory of the south — journeys here are planned individually by the Trust office.",
        centres: ["Itinerary to be announced by the Trust office"],
      },
    ],
  },
  {
    slug: "north-india",
    title: "North India",
    sa: "उत्तरभारतम्",
    saRoman: "Uttara Bhāratam",
    text: "The Himalayan and Gangetic heartland of Sanātana Dharma — from Kāśī and Ayodhyā to the Himalayan shrines.",
    states: [
      {
        slug: "uttar-pradesh",
        title: "Uttar Pradesh",
        sa: "उत्तरप्रदेशः",
        text: "The sacred cities of Kāśī, Ayodhyā, Mathurā and Prayāgrāj on the banks of the Gaṅgā and Yamunā.",
        centres: ["Kāśī Viśvanātha, Varanasi", "Śrī Rāma Janmabhūmi, Ayodhyā", "Śrī Kṛṣṇa Janmabhūmi, Mathurā", "Triveṇī Saṅgam, Prayāgrāj"],
      },
      {
        slug: "uttarakhand",
        title: "Uttarakhand",
        sa: "उत्तराखण्डः",
        text: "Devabhūmi — the Himalayan abode of the Char Dham and the source of the Gaṅgā.",
        centres: ["Badrīnātha", "Kedārnātha", "Gaṅgotrī and Yamunotrī", "Haridvāra and Ṛṣikeśa"],
      },
      {
        slug: "himachal-pradesh",
        title: "Himachal Pradesh",
        sa: "हिमाचलप्रदेशः",
        text: "Ancient Devī and Śiva shrines in the western Himalaya.",
        centres: ["Jvālāmukhī Devī", "Cintapūrṇī Devī", "Naina Devī", "Baijanātha"],
      },
      {
        slug: "jammu-kashmir",
        title: "Jammu & Kashmir",
        sa: "जम्मूकश्मीरम्",
        text: "Śāradā Deśa, the land of Kashmir Śaivism, and the cave shrines of Śrī Vaiṣṇo Devī and Amarnāth.",
        centres: ["Śrī Vaiṣṇo Devī, Katra", "Amarnāth Cave", "Śaṅkarācārya Temple, Srinagar"],
      },
      {
        slug: "punjab-haryana",
        title: "Punjab & Haryana",
        sa: "पञ्जाबः हरियाणा च",
        text: "Kurukṣetra, the field of the Bhagavad Gītā, and the sacred tanks of the Punjab.",
        centres: ["Kurukṣetra", "Śrī Devī Talāb Mandir, Jalandhar", "Mansā Devī, Pañcakūlā"],
      },
    ],
  },
  {
    slug: "east-india",
    title: "East India",
    sa: "पूर्वभारतम्",
    saRoman: "Pūrva Bhāratam",
    text: "The land of Jagannātha, Kālī and the Gaṅgā delta — Odisha, Bengal, Bihar, Jharkhand and Assam.",
    states: [
      {
        slug: "odisha",
        title: "Odisha",
        sa: "ओडिशा (उत्कलः)",
        text: "Utkala Deśa, home of the Jagannātha Purī Dhāma and the Kalinga temple style.",
        centres: ["Śrī Jagannātha Temple, Purī", "Koṇārka Sun Temple", "Liṅgarāja Temple, Bhubaneswar"],
      },
      {
        slug: "west-bengal",
        title: "West Bengal",
        sa: "पश्चिमवङ्गः",
        text: "Śakti Pīṭhas, Gaṅgāsāgara and the temples of Kālī on the Hooghly.",
        centres: ["Kālīghāṭ Temple, Kolkata", "Dakṣiṇeśvara Kālī Temple", "Gaṅgāsāgara", "Tārāpīṭha"],
      },
      {
        slug: "bihar-jharkhand",
        title: "Bihar & Jharkhand",
        sa: "बिहारः झारखण्डः च",
        text: "Gayā, the sacred site of Pitṛ-tarpaṇa, and the Baidyanāth Jyotirliṅga.",
        centres: ["Viṣṇupada Temple, Gayā", "Baidyanāth Dhām, Deoghar", "Pāvāpurī"],
      },
      {
        slug: "assam",
        title: "Assam",
        sa: "असमः",
        text: "Kāmarūpa, the great seat of Śakti worship on the Brahmaputra.",
        centres: ["Kāmākhyā Devī Temple, Guwahati", "Umānanda Temple", "Hājo"],
      },
    ],
  },
  {
    slug: "west-india",
    title: "West India",
    sa: "पश्चिमभारतम्",
    saRoman: "Paścima Bhāratam",
    text: "The land of Dvārakā, Somanātha and the great Śakti shrines of the western coast — Gujarat, Rajasthan and Goa.",
    states: [
      {
        slug: "gujarat",
        title: "Gujarat",
        sa: "गुजरातः",
        text: "Dvārakā and Somanātha — two of the holiest sites on the western shore.",
        centres: ["Dvārakādhīśa Temple, Dvārakā", "Somanātha Jyotirliṅga", "Nāgeśvara Jyotirliṅga", "Ambājī Śakti Pīṭha"],
      },
      {
        slug: "rajasthan",
        title: "Rajasthan",
        sa: "राजस्थानम्",
        text: "Pushkar, with its ancient Brahmā temple, and the sacred sites of Mewar and Marwar.",
        centres: ["Brahmā Temple, Pushkar", "Nāthadvārā", "Ekliṅgajī, Udaipur"],
      },
      {
        slug: "goa",
        title: "Goa",
        sa: "गोमन्तकम्",
        text: "Gomantaka — temples of the Konkan coast, dedicated to Śiva, Devī and Gaṇeśa.",
        centres: ["Maṅgeśī Temple", "Śāntādurgā Temple", "Mahālasā Temple"],
      },
    ],
  },
  {
    slug: "central-india",
    title: "Central India",
    sa: "मध्यभारतम्",
    saRoman: "Madhya Bhāratam",
    text: "The heart of Bharat — the Narmadā valley, Mahākāla at Ujjain and the temples of the central plateau.",
    states: [
      {
        slug: "madhya-pradesh",
        title: "Madhya Pradesh",
        sa: "मध्यप्रदेशः",
        text: "Ujjayinī and the banks of the Narmadā, with two Jyotirliṅgas.",
        centres: ["Mahākāleśvara Jyotirliṅga, Ujjain", "Oṅkāreśvara Jyotirliṅga", "Narmadā Parikramā", "Khajuraho"],
      },
      {
        slug: "chhattisgarh",
        title: "Chhattisgarh",
        sa: "छत्तीसगढः",
        text: "Dakṣiṇa Kosala — the maternal home of Śrī Rāma and ancient temples of the Mahānadī valley.",
        centres: ["Candrahāsinī Devī, Chandrapur", "Rājīva Locana Temple, Rajim", "Bamleśvarī Devī, Dongargarh"],
      },
    ],
  },
  {
    slug: "others",
    title: "Others",
    sa: "अन्यानि क्षेत्राणि",
    saRoman: "Anyāni Kṣetrāṇi",
    text: "Sacred journeys beyond the usual circuits — Nepal, Kailāsa–Mānasarovara and Sri Lanka.",
    states: [
      {
        slug: "nepal",
        title: "Nepal",
        sa: "नेपालम्",
        text: "The Himalayan kingdom of Paśupatinātha, Muktinātha and Janakpur.",
        centres: ["Paśupatinātha Temple, Kathmandu", "Muktinātha", "Jānakī Mandir, Janakpur"],
      },
      {
        slug: "kailasa-manasarovara",
        title: "Kailāsa–Mānasarovara",
        sa: "कैलासमानसरोवरम्",
        text: "The great Himalayan yātrā to the abode of Śiva and the sacred lake.",
        centres: ["Mount Kailāsa", "Mānasarovara"],
      },
      {
        slug: "sri-lanka",
        title: "Sri Lanka",
        sa: "श्रीलङ्का",
        text: "Sites of the Rāmāyaṇa and ancient Śiva temples of the island.",
        centres: ["Koneswaram Temple, Trincomalee", "Muneswaram Temple, Chilaw", "Katirgama (Kataragama)"],
      },
    ],
  },
];

export const pilgrimageRegionsFlat = pilgrimageDirections.flatMap((d) => d.states.map((s) => ({ ...s, direction: d.slug })));
