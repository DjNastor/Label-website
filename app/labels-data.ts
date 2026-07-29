export type SceneLabel = {
  name: string;
  region: string;
  description: string;
  artists: string[];
  website?: string;
  platform?: string;
  featured?: boolean;
};

export const sceneLabels: SceneLabel[] = [
  { name: "Soulistic Music", region: "South Africa", description: "Deep, soulful house with a strong South African identity and a lasting influence on the global Afro House movement.", artists: ["Black Coffee", "Caiiro", "Da Capo"], website: "https://soulisticmusic.com", featured: true },
  { name: "Keinemusik", region: "Berlin, Germany", description: "A DJ and producer collective known for melodic, organic club music and a distinct visual world around its releases.", artists: ["&ME", "Adam Port", "Rampa", "Reznik"], website: "https://keinemusik.com", platform: "https://www.beatport.com/label/keinemusik/12792", featured: true },
  { name: "MoBlack Records", region: "Italy / Global", description: "A global home for Afro House, championing rhythmic, melodic and vocal-led records from artists across continents.", artists: ["Enoo Napa", "Thandi Draai", "Da Capo"], website: "https://moblack.com", platform: "https://www.beatport.com/label/moblack-records/38387" },
  { name: "Afrocentric Records", region: "South Africa", description: "A label focused on authentic African sounds, strong songwriting and emerging talent from across the continent.", artists: ["DJ Qness", "Stones & Bones"], website: "https://www.afrocentricrecords.com", platform: "https://www.beatport.com/label/afrocentric-records/19823" },
  { name: "Yoruba Records", region: "United States", description: "A pioneering spiritual house imprint where African musical traditions meet deep, meditative club production.", artists: ["Osunlade", "Boddhi Satva"], website: "https://www.instagram.com/yorubarecords", platform: "https://www.beatport.com/label/yoruba-records/6649" },
  { name: "Kunye", region: "South Africa", description: "A platform for progressive Afro sounds, community energy and the next generation of South African electronic artists.", artists: ["Shimza", "Karyendasoul"], website: "https://kunyerecords.co.za" },
  { name: "Stay True Sounds", region: "Cape Town, South Africa", description: "An underground-focused label supporting South African talent and forward-thinking house music.", artists: ["Kid Fonque", "Jazzuelle", "Dwson"], website: "https://staytruesounds.bandcamp.com", platform: "https://www.beatport.com/label/stay-true-sounds/52789" },
  { name: "Innervisions", region: "Berlin, Germany", description: "Boutique electronic music with emotional depth, detailed production and a strong melodic sensibility.", artists: ["Dixon", "Âme", "Henrik Schwarz"], website: "https://innervisions.com", platform: "https://www.beatport.com/label/innervisions/3315" },
  { name: "Watergate Records", region: "Berlin, Germany", description: "The record arm of Berlin’s iconic club, connecting deep, melodic and Afro-influenced sounds.", artists: ["Hyenah", "Jimi Jules", "Kristin Velvet"], website: "https://ra.co/labels/1462", platform: "https://www.beatport.com/label/watergate-records/30691" },
  { name: "Get Physical Music", region: "Berlin, Germany", description: "An influential house label with a broad catalogue that has embraced organic and Afro House textures.", artists: ["&ME", "BLOND:ISH", "WhoMadeWho"], website: "https://getphysicalmusic.bandcamp.com", platform: "https://www.beatport.com/label/get-physical-music/3212" },
];
