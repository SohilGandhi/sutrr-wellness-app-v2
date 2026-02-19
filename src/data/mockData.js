export const products = [
    { id: 1, name: 'Vitality Boost Supplement', category: 'Supplements', price: 1299, mrp: 1799, badge: 'AI Recommended', desc: 'Clinically formulated blend of Ashwagandha, Shilajit & Zinc for enhanced energy and vitality.', rating: 4.6, reviews: 234 },
    { id: 2, name: 'Intimate Wellness Oil', category: 'Wellness', price: 849, mrp: 1199, badge: 'Bestseller', desc: 'Ayurvedic cold-pressed oil with Saffron & Almond for improved intimate wellness.', rating: 4.8, reviews: 512 },
    { id: 3, name: 'Couples Communication Cards', category: 'Books', price: 599, mrp: 799, badge: null, desc: '52-card deck designed by certified sex therapists to improve partner communication.', rating: 4.5, reviews: 178 },
    { id: 4, name: 'Pelvic Floor Trainer', category: 'Devices', price: 3499, mrp: 4999, badge: 'Doctor Approved', desc: 'App-connected Kegel exerciser with guided programs for pelvic health.', rating: 4.7, reviews: 89 },
    { id: 5, name: 'Hormonal Balance Kit', category: 'Kits', price: 2199, mrp: 2999, badge: 'AI Recommended', desc: '30-day kit with adaptogenic herbs, probiotics, and micronutrients for hormonal equilibrium.', rating: 4.4, reviews: 156 },
    { id: 6, name: 'Mindful Intimacy Guide', category: 'Books', price: 449, mrp: 599, badge: null, desc: 'Evidence-based guide by Dr. Meera Sharma on building emotional and physical intimacy.', rating: 4.9, reviews: 342 },
    { id: 7, name: 'Natural Lubricant Gel', category: 'Wellness', price: 699, mrp: 999, badge: 'Bestseller', desc: 'pH-balanced, water-based formula with Aloe Vera. Dermatologically tested.', rating: 4.6, reviews: 621 },
    { id: 8, name: 'Stress Relief Aromatherapy Set', category: 'Wellness', price: 1599, mrp: 2199, badge: null, desc: 'Lavender & Ylang Ylang essential oils with a ceramic diffuser for relaxation rituals.', rating: 4.3, reviews: 97 },
];

export const categories = ['All', 'Supplements', 'Wellness', 'Books', 'Devices', 'Kits'];

export const articles = [
    { id: 1, title: 'Understanding Consent in Modern Relationships', category: 'Communication', readTime: '4 min', excerpt: 'Consent is an ongoing conversation, not a one-time checkbox...' },
    { id: 2, title: '5 Myths About Sexual Health Debunked', category: 'Basics', readTime: '6 min', excerpt: 'Separating clinical evidence from cultural misconceptions...' },
    { id: 3, title: 'The Science Behind Libido Fluctuations', category: 'Health Tips', readTime: '5 min', excerpt: 'Hormonal cycles, stress, and lifestyle factors that affect desire...' },
    { id: 4, title: 'Mindfulness Exercises for Intimate Moments', category: 'Mindfulness', readTime: '3 min', excerpt: 'Breathing techniques to enhance presence and connection...' },
    { id: 5, title: 'Nutrition and Sexual Wellness: What Works', category: 'Health Tips', readTime: '7 min', excerpt: 'Evidence-based dietary choices for reproductive health...' },
    { id: 6, title: 'Navigating Conversations with Your Partner', category: 'Communication', readTime: '5 min', excerpt: 'Frameworks for discussing needs, boundaries, and desires...' },
];

export const experts = [
    { id: 1, name: 'Dr. Priya Mehta', speciality: 'Sexual Health Counselor', languages: ['Hindi', 'English'], rating: 4.9, experience: '12 years', available: true, gender: 'Female' },
    { id: 2, name: 'Dr. Arjun Kapoor', speciality: 'Reproductive Medicine', languages: ['Hindi', 'English', 'Marathi'], rating: 4.8, experience: '15 years', available: true, gender: 'Male' },
    { id: 3, name: 'Dr. Sana Khan', speciality: 'Couples Therapist', languages: ['Hindi', 'English', 'Urdu'], rating: 4.7, experience: '8 years', available: false, gender: 'Female' },
    { id: 4, name: 'Dr. Vikram Joshi', speciality: 'Sexologist & Andrologist', languages: ['Hindi', 'English', 'Gujarati'], rating: 4.9, experience: '20 years', available: true, gender: 'Male' },
];

export const chatResponses = [
    { q: 'What supplements support libido?', a: 'Based on clinical evidence, Ashwagandha and Zinc are well-studied for supporting healthy libido. Our Vitality Boost Supplement combines both. However, please consult your doctor before starting any supplement regimen.' },
    { q: 'How can I improve communication with my partner?', a: 'Research shows that scheduled "check-in" conversations and using "I feel" statements can significantly improve intimate communication. Our Couples Communication Cards are designed by therapists for this purpose.' },
    { q: 'Is it normal to have low energy?', a: 'Fluctuations in energy are normal and influenced by sleep, stress, hormones, and nutrition. If persistent, consider speaking with one of our verified experts. You can book an anonymous session from the Expert Connect tab.' },
    { q: 'What are pelvic floor exercises?', a: 'Pelvic floor exercises (Kegels) strengthen the muscles supporting your bladder, uterus, and bowel. They can improve sexual function, bladder control, and recovery postpartum. Our Pelvic Floor Trainer offers guided programs.' },
];

export const wellnessScore = {
    score: 82,
    mood: 'Good',
    energy: 'Moderate',
    insight: '"Communication is the core of intimacy. Today, try expressing one small preference to your partner."'

};

export const quickLogs = [
    { id: 1, label: 'Mood', icon: 'Wind' },
    { id: 2, label: 'Energy', icon: 'Zap' },
    { id: 3, label: 'Cycle', icon: 'Activity' },
    { id: 4, label: 'Journal', icon: 'BookOpen' }
];

export const dailyInsight = {
    text: "Communication is the core of intimacy. Today, try expressing one small preference to your partner."
};
