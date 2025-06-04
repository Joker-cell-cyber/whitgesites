export type Product = {
  id: number;
  name: string;
  price: number;
  shortDescription: string;
  fullDescription?: string;
  images: string[];
  category: string;
  featured?: boolean;
  benefits?: string[];
  specifications?: {[key: string]: string};
  ageRange?: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Roland Mini Ball",
    price: 9.99,
    shortDescription: "A fun and bouncy keychain inspired by the Roland Garros universe. Ideal for tennis fans and miniature plushie lovers.",
    fullDescription: "The Roland Mini Ball is an adorable keychain that combines the elegance of tennis with the charm of a mini plushie. Its textured surface is reminiscent of a tennis ball, while its compact size makes it the perfect accessory for your keys or bag. Roland Garros fans will appreciate this small nod to their favorite tournament, available year-round to bring a playful touch to your everyday life.",
    images: [
      "/images/plushies/miniball-1.jpg",
      "/images/plushies/miniball-2.jpg"
    ],
    category: "Functional Accessories",
    featured: true,
    benefits: [
      "Ultra compact format",
      "Texture inspired by tennis balls",
      "Durable metal ring",
      "Excellent gift idea for tennis fans"
    ],
    specifications: {
      "Dimensions": "5 cm diameter",
      "Materials": "Plush exterior, polyester filling",
      "Care": "Surface washing only",
      "Recommended age": "3 years and up"
    },
    ageRange: "3+ years"
  },
  {
    id: 2,
    name: "SoftBag R'Beige",
    price: 69.99,
    shortDescription: "A soft bear-shaped bag, practical and cute, perfect for accompanying little ones on their outings.",
    fullDescription: "The SoftBag R'Beige is more than just a bag, it's an adorable travel companion for your child. Its ultra-soft beige plush texture and bear design with cute ears make it an accessory that children love to carry. Spacious enough to contain a child's essentials such as a small water bottle, a snack and a few small treasures, it perfectly accompanies daily outings while providing comfort and tenderness.",
    images: [
      "/images/plushies/Sac-peluche-1.jpg",
      "/images/plushies/Sac-peluche-2.jpg",
      "/images/plushies/Sac-peluche-3.jpg"
    ],
    category: "Functional Accessories",
    featured: true,
    benefits: [
      "Adorable beige bear design",
      "Spacious interior for little treasures",
      "Adjustable straps for optimal comfort",
      "Soft and pleasant to touch fabric"
    ],
    specifications: {
      "Dimensions": "25 x 20 x 10 cm",
      "Materials": "Polyester plush, cotton lining",
      "Capacity": "2 liters",
      "Care": "Machine washable at 30°C"
    },
    ageRange: "3+ years"
  },
  {
    id: 3,
    name: "SoftBag Brown'Bear",
    price: 19.50,
    shortDescription: "This brown plush bag combines functionality and tenderness, with a small pocket for storing children's treasures.",
    fullDescription: "The SoftBag Brown'Bear is an adorable brown bear-shaped bag that combines utility with pleasure. Smaller than its cousin the R'Beige, it's perfect for toddlers who are starting to want to carry their own things. Its zippered front pocket keeps small treasures safe, while the main compartment is ideal for a snack or a small toy. Its soft texture also makes it a comforting friend during first trips to daycare or school.",
    images: [
      "/images/plushies/SAC-DOUDOU-marron-1.jpg",
      "/images/plushies/SAC-DOUDOU-marron-2.jpg"
    ],
    category: "Functional Accessories",
    featured: false,
    benefits: [
      "Compact format ideal for little ones",
      "Secured front pocket with zipper",
      "Soft and comfortable straps",
      "Warm brown bear design"
    ],
    specifications: {
      "Dimensions": "20 x 15 x 8 cm",
      "Materials": "Polyester plush, cotton lining",
      "Capacity": "1 liter",
      "Care": "Machine washable at 30°C"
    },
    ageRange: "2+ years"
  },
  {
    id: 4,
    name: "Aneth the Green Cow",
    price: 59.90,
    shortDescription: "An original green cow-shaped plush with an integrated small comfort toy, ideal for a unique and comforting gift.",
    fullDescription: "Aneth the Green Cow is an absolutely unique plush that will charm with its originality and surprising green color. This adorable cow with soft fur has a charming particularity: an integrated mini comfort toy that the child can detach and reattach thanks to a Velcro system. Two comfort toys in one, Aneth offers a double dose of comfort and stimulates fine motor skills in little hands. Its bold design makes it an out-of-the-ordinary gift while guaranteeing tenderness and attachment.",
    images: [
      "/images/plushies/Peluche-vache-verte-1.jpg",
      "/images/plushies/Peluche-vache-verte-2.jpg",
      "/images/plushies/Peluche-vache-verte-3.jpg"
    ],
    category: "Plushies & Toys",
    featured: true,
    benefits: [
      "Innovative 2-in-1 concept with detachable mini comfort toy",
      "Original green color that stimulates curiosity",
      "Ultra soft texture for comforting hugs",
      "Develops fine motor skills and imagination"
    ],
    specifications: {
      "Dimensions": "30 cm (cow), 10 cm (mini comfort toy)",
      "Materials": "Hypoallergenic polyester plush",
      "Special feature": "Removable mini comfort toy with Velcro",
      "Care": "Machine washable at 30°C"
    },
    ageRange: "0+ months"
  },
  {
    id: 5,
    name: "Grizou Party25",
    price: 49.90,
    shortDescription: "Chic little gray bear with pacifier clip, designed to accompany newborns with softness and style.",
    fullDescription: "Grizou Party25 is an elegant little gray teddy bear, specially designed for special occasions such as a baptism or birthday. Its ultra-soft fur is complemented by a chic bow tie, giving it a festive look. Functional as well as adorable, Grizou is equipped with an elegantly concealed pacifier clip, allowing baby to always keep their pacifier at hand while having their comfort toy nearby. A precious gift that will accompany the little ones from birth.",
    images: [
      "/images/plushies/Ours-en-peluche-Gris-attache-1.jpg",
      "/images/plushies/Ours-en-peluche-Gris-attache-2.jpg"
    ],
    category: "Functional Accessories",
    featured: true,
    benefits: [
      "Elegant design perfect for special occasions",
      "Discreet and practical pacifier clip",
      "Exceptionally soft texture for sensitive skin",
      "Ideal size for little hands"
    ],
    specifications: {
      "Dimensions": "25 cm",
      "Materials": "Premium plush, food-grade silicone clip",
      "Special feature": "Integrated pacifier clip",
      "Care": "Machine washable at 30°C, delicate cycle"
    },
    ageRange: "0+ months"
  },
  {
    id: 6,
    name: "Lapino Blue Snow",
    price: 99.99,
    shortDescription: "Large white rabbit with a soft blue bow, all in softness, perfect for warming the hugs of small and big ones.",
    fullDescription: "Lapino Blue Snow is a beautiful white long-eared rabbit that brings a comforting presence to the child's room. At 60 cm, it offers a significant presence and becomes the ideal companion for hugs, while its elegant soft blue bow adds an extra touch of softness. Its snow-white fur is exceptionally soft, specially selected for moments of tenderness. Lapino's long ears are designed to be easily grabbed by little hands, making it a faithful friend from the first months.",
    images: [
      "/images/plushies/lapino-blue-snow-1.jpg"
    ],
    category: "Plushies & Toys",
    featured: true,
    benefits: [
      "Large 60 cm size ideal for hugs",
      "Long ears easy to grasp for babies",
      "Exceptionally soft fur",
      "Elegant design with delicate blue bow"
    ],
    specifications: {
      "Dimensions": "60 cm (including ears)",
      "Materials": "Premium polyester plush, hypoallergenic filling",
      "Features": "Long ears, removable blue bow",
      "Care": "Machine washable at 30°C, delicate cycle"
    },
    ageRange: "0+ months"
  },
  {
    id: 7,
    name: "Pollen the Organic Bee",
    price: 79.99,
    shortDescription: "Large 90 cm organic cotton bee plush, with an elegant and soft design, ideal for decorating and brightening up baby's room.",
    fullDescription: "Pollen the Organic Bee is a magnificent 90 cm giant plush made from organic cotton. Its elegant design combines softness and character with its distinctive blue head, delicately crafted wings and mustard yellow striped outfit. Perfect as a decorative element for a child's room, this bee with a soft and expressive face quickly becomes a beloved playmate. Its careful details such as its striped feet and hands, textured overalls and small bow under the chin testify to quality craftsmanship. Made with ecological and hypoallergenic materials, Pollen is a precious gift that will accompany the child for many years.",
    images: [
      "/images/plushies/Screenshot-2025-05-15-at-15.49.17.png",
      "/images/plushies/Screenshot-2025-05-15-at-15.49.30.png",
      "/images/plushies/Screenshot-2025-05-15-at-15.49.45.png"
    ],
    category: "Plushies & Toys",
    featured: true,
    benefits: [
      "Made from eco-friendly organic cotton",
      "Large 90 cm format for visual and emotional impact",
      "Unique design combining tenderness and originality",
      "Careful details and quality finishes"
    ],
    specifications: {
      "Dimensions": "90 cm in height",
      "Materials": "Organic cotton, hypoallergenic filling",
      "Features": "Textured wings, striped costume, blue cap",
      "Care": "Surface washable, delicate parts to be cleaned with care"
    },
    ageRange: "0+ months"
  },
  {
    id: 8,
    name: "PowderyMax 120",
    price: 119.50,
    shortDescription: "The king of plushies! This giant 120 cm white bear offers a reassuring and spectacular presence.",
    fullDescription: "PowderyMax 120 is truly the king of comfort toys, a majestic 120 cm white bear that instantly becomes the focal point of any child's room. Its impressive size makes it as much a decorative element as a play and comfort companion. Despite its large size, PowderyMax is incredibly soft and fluffy, with perfectly balanced stuffing that allows you to lean comfortably against it for reading or relaxing. Its reassuring presence accompanies the child throughout their growth, becoming a silent but faithful witness to moments of joy as well as small sorrows.",
    images: [
      "/images/plushies/dc3416-1-63693429d6191891266115.jpg",
      "/images/plushies/dc3416-2-6369342a10cdd667766912.jpg",
      "/images/plushies/dc3416-63693429b8089544214553.jpg"
    ],
    category: "Plushies & Toys",
    featured: true,
    benefits: [
      "Spectacular 120 cm size for maximum impact",
      "Perfect balance between firmness and softness for optimal comfort",
      "Reassuring presence in the child's room",
      "Durable companion that stands the test of time"
    ],
    specifications: {
      "Dimensions": "120 cm in height",
      "Materials": "Premium polyester plush, dense hypoallergenic filling",
      "Weight": "3.5 kg",
      "Care": "Surface cleaning, hand washable removable parts"
    },
    ageRange: "3+ years"
  },
  {
    id: 9,
    name: "PowderyMini 60",
    price: 89.50,
    shortDescription: "The medium version of the powdered bear, soft and elegant, perfect for decorating or offering a sized hug.",
    fullDescription: "PowderyMini 60 is the intermediate version of our popular powdered white bear. At 60 cm, it offers a significant presence but is more easily manageable for children than its 120 cm big brother. Its immaculate white coat evokes the softness of fresh snow, while its benevolent expression instantly invites hugs. PowderyMini is large enough to be a striking decorative element in a room, while remaining light enough to be carried from one room to another by the child. A versatile companion that adapts to all spaces and all ages.",
    images: [
      "/images/plushies/dc3410-636934ee5184d315193867.jpg"
    ],
    category: "Plushies & Toys",
    featured: false,
    benefits: [
      "Intermediate size ideal for all spaces",
      "Exceptional softness of the powdered white coat",
      "Lightness allowing easy handling",
      "Timeless design that spans generations"
    ],
    specifications: {
      "Dimensions": "60 cm in height",
      "Materials": "Premium polyester plush, hypoallergenic filling",
      "Weight": "1.2 kg",
      "Care": "Surface washable, structure maintained after cleaning"
    },
    ageRange: "2+ years"
  },
  {
    id: 10,
    name: "RedPanda XL",
    price: 109.90,
    shortDescription: "This 100 cm red panda impresses with its softness and realism, a perfect choice for a warm room.",
    fullDescription: "RedPanda XL is an impressive 100 cm plush representing a red panda with striking realism. Its warm colors and incredibly soft texture make it a remarkable piece that instantly brings warmth and character to any room. Unlike standard plushies, RedPanda XL stands out for its attention to anatomical details that will delight animal lovers: its fluffy tail, expressive facial mask and delicately sculpted paws demonstrate a true attention to detail. Both a spectacular decorative object and a comforting cuddly companion, it represents an exceptional gift that will make a lasting impression.",
    images: [
      "/images/plushies/dc4065-2-64a685c19d154714256525.jpg",
      "/images/plushies/dc4065-3-64a685c1bdbe1331373170.jpg",
      "/images/plushies/dc4065-6464b4e4cdc61370524439.jpg"
    ],
    category: "Plushies & Toys",
    featured: true,
    benefits: [
      "Realistic design inspired by the real red panda",
      "Large 100 cm size for maximum impact",
      "Warm colors that illuminate the space",
      "Varied texture faithfully reproducing natural fur"
    ],
    specifications: {
      "Dimensions": "100 cm (total length including tail)",
      "Materials": "Polyester plush of different textures, dense filling",
      "Features": "Extra fluffy tail, faithful anatomical details",
      "Care": "Surface cleaning only, gentle brushing recommended"
    },
    ageRange: "3+ years"
  },
  {
    id: 11,
    name: "Anette Clip'Soft",
    price: 29.90,
    shortDescription: "Small colorful cow with pacifier clip, ideal for accompanying baby throughout the day.",
    fullDescription: "Anette Clip'Soft is the little sister of Aneth the Green Cow, specially designed for toddlers with its integrated pacifier clip system. This adorable little cow in bright colors (available in green, blue or pink) combines the softness of a traditional comfort toy with the practicality of a pacifier clip. Its compact size makes it easy to attach to a car seat, stroller or baby carrier, ensuring that baby's pacifier always stays clean and within reach. Its small legs and head are perfectly sized to be grabbed by little hands, promoting the development of fine motor skills.",
    images: [
      "/images/plushies/dc4320-1-67e6b6bd04c9e809104786.jpg",
      "/images/plushies/dc4320-1-67e67da3214b5206382293.jpg"
    ],
    category: "Functional Accessories",
    featured: false,
    benefits: [
      "Secure and easy-to-use pacifier clip",
      "Compact format ideal for travel",
      "Bright colors stimulating visual development",
      "Design promoting grip by little hands"
    ],
    specifications: {
      "Dimensions": "15 cm",
      "Materials": "Polyester plush, BPA-free plastic clip",
      "Available colors": "Green, blue or pink",
      "Care": "Machine washable at 30°C, delicate cycle"
    },
    ageRange: "0+ months"
  },
  {
    id: 12,
    name: "CuteHedgehog 12",
    price: 39.99,
    shortDescription: "An ultra compact hedgehog with incredible charm, to take everywhere to reassure baby in all circumstances.",
    fullDescription: "Don't be fooled by its name - although compact at only 12 cm, CuteHedgehog 12 is a premium plush with a unique design. This adorable hedgehog is made from luxury materials, with simulated spikes in ultra-soft textured fabric and a hand-embroidered expressive face. Designed as a perfect transitional object, its small size allows the child to take it everywhere, while its slightly weighted filling provides a soothing sensation. Each CuteHedgehog is handcrafted in limited series, making it a precious object and an out-of-the-ordinary birth gift.",
    images: [
      "/images/plushies/DC3983-1.jpg"
    ],
    category: "Plushies & Toys",
    featured: true,
    benefits: [
      "Compact premium travel format",
      "Handcrafted in limited series",
      "Luxury materials and impeccable finish",
      "Light weighting for a calming effect"
    ],
    specifications: {
      "Dimensions": "12 cm",
      "Materials": "Various luxury fabrics, hand embroidery",
      "Features": "Slightly weighted, unique serial number",
      "Care": "Hand wash only, flat drying"
    },
    ageRange: "0+ months"
  }
]; 