export const LINKS = {
  x: "https://x.com/dbayexquisite",
  xIntent:
    "https://x.com/intent/tweet?text=Hi%20D%27BAY-Exquisite%2C%20I%27d%20like%20a%20quote%20for%20this%20item%3A%20",
  linktree: "https://linktr.ee/dbayexquisite",
  instagram: "https://instagram.com/dbayexquisite",
} as const;

export const COMPANY = {
  name: "D'BAY-Exquisite Limited",
  rc: "RC: 7325041",
  location: "Nigeria",
  tagline: "US shopping & shipping, delivered across Nigeria",
} as const;

export const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
] as const;

export const STEPS = [
  {
    number: "01",
    title: "Find your item",
    description:
      "Search eBay, Amazon, or any US online store for what you want. Read the listing carefully, especially condition and seller notes.",
  },
  {
    number: "02",
    title: "Send us the link",
    description:
      "Share the product URL on X. We vet the seller and tell you if it's someone we trust. If all looks good, we quote the landed cost in Naira.",
  },
  {
    number: "03",
    title: "Pay & we purchase",
    description:
      "You pay; we buy the item and arrange international shipping. Shipping is billed separately by weight. We'll notify you when it's due.",
  },
  {
    number: "04",
    title: "Transit to Nigeria",
    description:
      "Delivery typically takes about 15 working days. FX rates can shift between quote and payment, and we'll keep you informed.",
  },
  {
    number: "05",
    title: "Doorstep delivery",
    description:
      "When your parcel arrives in Nigeria, we collect your delivery details and local delivery fee. Then it comes straight to you.",
  },
] as const;

export const CATEGORIES = [
  "Smartphones",
  "Laptops",
  "Earbuds & audio",
  "Gaming gear",
  "Smartwatches",
  "Tablets",
  "Accessories",
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Sent an eBay link for a MacBook. They vetted the seller, quoted in Naira, and it arrived exactly as described.",
    source: "Repeat customer via X",
  },
  {
    quote:
      "Clear breakdown of item cost vs shipping. No surprises when the weight-based shipping came due.",
    source: "Tech buyer, Lagos",
  },
  {
    quote:
      "Been using them for US gadgets since 2020. Fast replies on X and honest about FX changes.",
    source: "Verified buyer",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "How do I get a quote?",
    answer:
      "Message us on X with the product link from any US store. We'll vet the listing and reply with a Naira quote when everything checks out.",
  },
  {
    question: "Why do rates change?",
    answer:
      "Our Naira prices follow the FX market. The quote you receive reflects rates at that moment and may be updated if there's a delay before payment.",
  },
  {
    question: "When do I pay shipping?",
    answer:
      "Usually not with the item payment. Shipping is calculated by weight when your parcel is ready to ship. We'll reach out with the amount.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "About 15 working days from purchase to arrival in Nigeria, then local delivery is arranged once we have your address and fee.",
  },
  {
    question: "What stores do you shop from?",
    answer:
      "eBay, Amazon, Best Buy, and most major US e-commerce sites. Send the link and we'll let you know if we can source it reliably.",
  },
] as const;
