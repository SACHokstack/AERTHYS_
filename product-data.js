/**
 * AERTHYS PRODUCT DATA
 * Shared data source for Products Page and Product Detail Page.
 */

const products = [
    {
        id: 'sunflower',
        name: 'Sunflower Microgreens',
        price: 120,
        unit: '100g',
        description: 'Nutty, crunchy shoots perfect for sandwiches and wraps.',
        longDescription: 'Our Sunflower Microgreens are robust, crunchy, and packed with a delightful nutty flavor that is reminiscent of raw sunflower seeds but fresher. Grown with care using organic soil, these sturdy greens add texture to any dish. They are harvested at the peak of vitality to ensure maximum nutrient density.',
        flavor: 'Mild & Nutty',
        tags: ['Vitamin E Rich', 'Protein-High'],
        badges: ['bestseller'],
        image: 'assets/sunflower-microgreens.jpg',
        category: 'mild',
        nutrition: {
            calories: '25 kcal',
            protein: '2.3g',
            vitA: '15% DV',
            vitC: '20% DV',
            vitK: '30% DV',
            iron: '8% DV'
        },
        reviews: 128,
        rating: 4.8
    },
    {
        id: 'broccoli',
        name: 'Broccoli Microgreens',
        price: 150,
        unit: '100g',
        description: 'Sulforaphane-rich superfood with mild cabbage notes.',
        longDescription: 'Broccoli Microgreens are scientifically proven to be one of the most nutrient-dense foods available. They contain up to 40 times more sulforaphane than mature broccoli, making them a powerful antioxidant boost. The flavor is mild and fresh, slightly peppery but very palatable.',
        flavor: 'Mild & Earthy',
        tags: ['Cancer-Fighting', 'Detox Support'],
        badges: ['chef'],
        image: 'assets/broccoli-microgreens.jpg',
        category: 'mild',
        nutrition: {
            calories: '31 kcal',
            protein: '3g',
            vitA: '20% DV',
            vitC: '100% DV',
            vitK: '180% DV',
            iron: '6% DV'
        },
        reviews: 95,
        rating: 4.9
    },
    {
        id: 'radish',
        name: 'Radish Microgreens',
        price: 140,
        unit: '100g',
        description: 'Spicy kick that elevates any dish instantly.',
        longDescription: 'Add a burst of color and spice to your plate with our Radish Microgreens. These tiny stems pack a concentrated peppery punch that mirrors the flavor of a full-grown radish. The beautiful purple and green hues make them a favorite garnish for chefs looking to add visual flair.',
        flavor: 'Spicy & Peppery',
        tags: ['Antioxidant Powerhouse', 'Metabolism'],
        badges: [],
        image: 'assets/radish-microgreens.jpg',
        category: 'spicy',
        nutrition: {
            calories: '20 kcal',
            protein: '1.8g',
            vitA: '10% DV',
            vitC: '35% DV',
            vitK: '40% DV',
            iron: '4% DV'
        },
        reviews: 64,
        rating: 4.7
    },
    {
        id: 'mixed',
        name: 'Mixed Greens Pack',
        price: 180,
        unit: '200g',
        description: 'Curated blend of our finest varieties for maximum nutrition.',
        longDescription: 'Can’t decide? The Mixed Greens Pack offers the best of all worlds. We carefully blend mild, spicy, and colorful varieties to give you a salad base that is complex, flavorful, and nutritionally complete. It’s the perfect weekly staple for health-conscious families.',
        flavor: 'Complex & Balanced',
        tags: ['Complete Nutrition', 'Best Value'],
        badges: ['new'],
        image: 'assets/hero-bg.jpg',
        category: 'salad',
        nutrition: {
            calories: '28 kcal',
            protein: '2.5g',
            vitA: '18% DV',
            vitC: '60% DV',
            vitK: '80% DV',
            iron: '7% DV'
        },
        reviews: 42,
        rating: 5.0
    },
    {
        id: 'pea',
        name: 'Pea Shoots',
        price: 100,
        unit: '100g',
        description: 'Sweet, tender greens with a fresh pea flavor.',
        longDescription: 'Our Pea Shoots are a customer favorite for their sweet, familiar flavor and tender crunch. The delicate tendrils are beautiful on the plate. They are excellent in stir-frys (added at the very end), salads, or simply snacked on raw.',
        flavor: 'Sweet & Fresh',
        tags: ['Vitamin C Rich', 'Kid Favorite'],
        badges: [],
        image: 'assets/pea-shoots.jpg',
        category: 'mild',
        nutrition: {
            calories: '30 kcal',
            protein: '3.2g',
            vitA: '12% DV',
            vitC: '45% DV',
            vitK: '50% DV',
            iron: '10% DV'
        },
        reviews: 210,
        rating: 4.9
    },
    {
        id: 'mustard',
        name: 'Mustard Microgreens',
        price: 110,
        unit: '100g',
        description: 'Bold, peppery greens that add serious flavor punch.',
        longDescription: 'For those who love bold flavors, Mustard Microgreens are essential. They deliver a sharp, wasabi-like kick that cuts through rich foods like meats and cheeses. Beyond flavor, they are excellent for digestion and clearing sinuses.',
        flavor: 'Spicy & Pungent',
        tags: ['Digestive Aid', 'Anti-inflammatory'],
        badges: [],
        image: 'assets/basil-microgreens.jpg',
        category: 'spicy',
        nutrition: {
            calories: '22 kcal',
            protein: '2g',
            vitA: '15% DV',
            vitC: '40% DV',
            vitK: '60% DV',
            iron: '5% DV'
        },
        reviews: 35,
        rating: 4.6
    }
];
