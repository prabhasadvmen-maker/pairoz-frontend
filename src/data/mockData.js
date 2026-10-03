const image = (id, width = 900) =>
  `https://${id.startsWith('premium_') ? 'plus' : 'images'}.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const campaignVideos = [
  '/3454830-uhd_2160_4096_25fps.mp4',
  '/3936462-hd_1920_1080_25fps.mp4',
  '/6371956-hd_1920_1080_30fps.mp4',
  '/7316094-uhd_2160_3840_25fps.mp4',
  '/8061666-uhd_3840_2160_25fps.mp4',
  '/8083681-uhd_3840_2160_24fps.mp4',
  '/9758397-uhd_4096_2160_25fps.mp4',
  '/9807773-uhd_4096_2160_25fps.mp4',
]

export const categories = [
  { name: 'Stilettos', slug: 'stilettos', image: image('photo-1519415943484-9fa1873496d4'), previewVideo: campaignVideos[0] },
  { name: 'Pumps', slug: 'pumps', image: image('photo-1605732440685-d0654d81aa30'), previewVideo: campaignVideos[1] },
  { name: 'Block Heels', slug: 'block-heels', image: image('photo-1605733513549-de9b150bd70d'), previewVideo: campaignVideos[2] },
  { name: 'Wedges', slug: 'wedges', image: image('photo-1620114884229-65d21f8c9423'), previewVideo: campaignVideos[3] },
  { name: 'Sandals', slug: 'sandals', image: image('premium_photo-1702226631942-921d35d4183a'), previewVideo: campaignVideos[4] },
  { name: 'Party Wear', slug: 'party-wear', image: image('premium_photo-1670984222499-b566bf5cef69'), previewVideo: campaignVideos[5] },
]

export const homepageImages = {
  hero: image('premium_photo-1738862176163-e7025ab4ac31', 1500),
  editorial: image('premium_photo-1676234844384-82e1830af724', 1400),
  aboutStory: image('photo-1562273138-f46be4ebdf33', 1600),
  instagram: [
    image('photo-1627141792925-eddee39cf275', 700),
    image('photo-1782232460628-ab38d15bd4af', 700),
    image('premium_photo-1738862176120-7767fce1244f', 700),
    image('premium_photo-1738862175998-3283e92026ad', 700),
  ],
}
export const homepageVideos = {
  hero: campaignVideos[6],
  editorial: campaignVideos[7],
}

export const brands = ['PAIROZ']
export const sizes = [36, 37, 38, 39, 40, 41]
export const colors = ['Ivory', 'Champagne', 'Rose Gold', 'Black', 'Blush']

const productSeeds = [
  ['Amora Crystal Stiletto', 'stilettos', 'Rose Gold', 9490, 11990, 'new bestseller'],
  ['Luna Satin Pump', 'pumps', 'Champagne', 8290, 9990, 'bestseller'],
  ['Celeste Block Heel', 'block-heels', 'Ivory', 7590, 8990, 'new'],
  ['Mira Evening Wedge', 'wedges', 'Black', 6990, 8490, ''],
  ['Soleil Strappy Sandal', 'sandals', 'Rose Gold', 6490, 7990, 'bestseller'],
  ['Noor Embellished Heel', 'party-wear', 'Blush', 10990, 13990, 'new bestseller'],
  ['Aurelia Pointed Stiletto', 'stilettos', 'Black', 8990, 10990, ''],
  ['Veloura Pearl Pump', 'pumps', 'Ivory', 9790, 11990, 'new'],
  ['Sienna Sculpted Block', 'block-heels', 'Champagne', 7890, 9490, 'bestseller'],
  ['Tara Woven Wedge', 'wedges', 'Blush', 6190, 7490, ''],
  ['Zara Minimal Sandal', 'sandals', 'Ivory', 5890, 6990, 'new'],
  ['Étoile Party Heel', 'party-wear', 'Rose Gold', 12490, 14990, 'bestseller'],
  ['Serene Suede Stiletto', 'stilettos', 'Blush', 9290, 11490, ''],
  ['Mila Bow Pump', 'pumps', 'Black', 8490, 10290, 'new'],
  ['Iris Comfort Block Heel', 'block-heels', 'Ivory', 7290, 8790, 'bestseller'],
  ['Cove Raffia Wedge', 'wedges', 'Champagne', 6790, 8190, ''],
  ['Dahlia Ankle Sandal', 'sandals', 'Black', 7290, 8790, 'new'],
  ['Opal Metallic Heel', 'party-wear', 'Champagne', 11490, 13990, 'bestseller'],
  ['Asha T-bar Stiletto', 'stilettos', 'Rose Gold', 9890, 11990, 'new'],
  ['Livia Slingback Pump', 'pumps', 'Blush', 8690, 10490, ''],
  ['Cleo Square Block Heel', 'block-heels', 'Black', 7990, 9590, 'bestseller'],
  ['Maya Luxe Wedge', 'wedges', 'Ivory', 7490, 8990, 'new'],
  ['Nysa Floral Sandal', 'sandals', 'Blush', 6890, 8290, ''],
  ['Rhea Sequin Party Heel', 'party-wear', 'Black', 12990, 15990, 'new bestseller'],
]

const photoIds = [
  'premium_photo-1661775566620-c8d785b32958',
  'photo-1596703263926-eb0762ee17e4',
  'photo-1611233299310-f6276ff55307',
  'photo-1551489186-ccb95a1ea6a3',
  'photo-1675474029076-ccfebb10ac26',
  'photo-1573100925118-870b8efc799d',
  'photo-1543163521-1bf539c55dd2',
  'photo-1535043934128-cf0b28d52f95',
  'photo-1562692158-7e4cbe83716f',
  'photo-1518049362265-d5b2a6467637',
  'photo-1554062614-6da4fa67725a',
  'photo-1564051806-be616e3bdcec',
  'photo-1590099033615-be195f8d575c',
  'photo-1618274158638-41d9f8d9279d',
  'photo-1621095012731-c43fe206a337',
  'photo-1623123627523-edd3cc6d13bb',
  'photo-1638265499174-62c2cb29137a',
  'photo-1662132090867-57a37fa1edf8',
  'photo-1678784973073-f6a227408e81',
  'photo-1678784973559-43fb10550343',
  'photo-1681797150715-1547f9b96707',
  'premium_photo-1671718111684-9142a70a5fe0',
  'premium_photo-1673977134662-a7b143adc016',
  'premium_photo-1737659252571-ab8c36e0c07c',
]

const shoeDetailPhotoIds = [
  'photo-1562273138-f46be4ebdf33',
  'photo-1651047532215-a9dfed5d2cef',
  'photo-1780301662392-6fea210dcd87',
  'photo-1543163521-1bf539c55dd2',
  'photo-1535043934128-cf0b28d52f95',
  'photo-1596703263926-eb0762ee17e4',
]

export const products = productSeeds.map(([title, category, color, price, compareAtPrice, tagText], index) => {
  const categoryName = categories.find((item) => item.slug === category).name
  const photo = image(photoIds[index], 900)
  return {
    id: `prz-${String(index + 1).padStart(3, '0')}`,
    title,
    slug: title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    brand: 'PAIROZ',
    category: categoryName,
    price,
    compareAtPrice,
    sizes: sizes.slice(index % 2, 6),
    colors: [color, colors.find((item) => item !== color)],
    images: [
      photo,
      image(shoeDetailPhotoIds[index % shoeDetailPhotoIds.length], 900),
      image(photoIds[(index + 1) % photoIds.length], 900),
      image(shoeDetailPhotoIds[(index + 2) % shoeDetailPhotoIds.length], 900),
      image(photoIds[(index + 6) % photoIds.length], 900),
    ],
    previewVideo: campaignVideos[(index + 6) % campaignVideos.length],
    description: `A refined ${categoryName.toLowerCase()} silhouette made for celebrations, long evenings and every moment in between. Thoughtful finishing meets considered comfort.`,
    specs: {
      Material: index % 2 ? 'Premium vegan leather' : 'Satin & artisan embellishment',
      Heel: `${6 + (index % 5)} cm sculpted heel`,
      Sole: 'Cushioned insole with flexible grip',
      Origin: 'Designed in India',
    },
    tags: tagText ? tagText.split(' ') : [],
    rating: Number((4.6 + (index % 5) * 0.1).toFixed(1)),
  }
})

export const faqs = [
  { question: 'How do I find my PAIROZ size?', answer: 'Our silhouettes generally run true to size. If you are between sizes, we recommend choosing the larger size. Each product page includes a detailed size guide.' },
  { question: 'Do you offer free shipping?', answer: 'Yes. Complimentary standard shipping is available on every order within India. Express options are shown at checkout in this frontend demo.' },
  { question: 'Can I return or exchange an item?', answer: 'Unworn items in their original packaging can be requested for return or exchange within 7 days of delivery. Final sale items are excluded.' },
  { question: 'How should I care for my shoes?', answer: 'Store your pair in its dust bag, away from direct sunlight. Gently wipe with a soft dry cloth and avoid water, perfume and harsh cleaners.' },
  { question: 'Are the products ethically made?', answer: 'We work with carefully selected makers and small production runs, prioritising responsible sourcing and considered craftsmanship.' },
]
