const mongoose = require('mongoose');
const Rule = require('../models/rule.model'); // Đảm bảo đường dẫn tới model Rule là chính xác

// Dữ liệu seeder cho các rule
const rulesSeeder = [
    { ruleId: "L1", description: "(M5 ∧ M2) → KL1" },
    { ruleId: "L2", description: "(M3 ∧ M4) → KL1" },
    { ruleId: "L3", description: "(P3 ∧ P5 ∧ P6) → KL2" },
    { ruleId: "L4", description: "(P2 ∧ P4) → KL2" },
    { ruleId: "L5", description: "(A1 ∧ A4) → KL5" },
    { ruleId: "L6", description: "(A3 ∧ A2) → KL6" },
    { ruleId: "L7", description: "(A5 ∧ A3) → KL7" },
    { ruleId: "L8", description: "(C1 ∧ C3) → KL8" },
    { ruleId: "L9", description: "(K3 ∧ K4) → KL9" },
    { ruleId: "L10", description: "(H6 ∧ S3) → KL10" },
    { ruleId: "L11", description: "(H1 ∧ H3) → KL11" },
    { ruleId: "L12", description: "(M1 ∧ P1) → KL12" },
    { ruleId: "L13", description: "(M3 ∧ P4 ∧ A2) → KL13" },
    { ruleId: "L14", description: "(M4 ∧ C3) → KL14" },
    { ruleId: "L15", description: "(A4 ∧ H2) → KL15" },
    { ruleId: "L16", description: "(H1 ∧ M5 ∧ P7) → KL16" },
    { ruleId: "L17", description: "(S1 ∧ C5) → KL17" },
    { ruleId: "L18", description: "(H1 ∧ H3 ∧ M5) → KL18" },
    { ruleId: "L19", description: "(P1 ∧ H1) → KL19" },
    { ruleId: "L20", description: "(M1 ∧ N1) → KL20" },
    { ruleId: "L21", description: "(H1 ∧ K2) → KL21" },
    { ruleId: "L22", description: "(S2 ∧ A1) → KL22" },
    { ruleId: "L23", description: "(M1 ∧ H3) → KL23" },
    { ruleId: "L24", description: "(P3 ∧ N2) → KL24" },
    { ruleId: "L25", description: "(C2 ∧ H5) → KL25" }
];

// Hàm để chèn dữ liệu seeder vào MongoDB
const seedRules = async () => {
    try {
        await mongoose.connect('mongodb+srv://bachoilabach:bach112003@clustertiktok.yl656aq.mongodb.net/expert_system', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        // Xóa các rule cũ nếu cần
        await Rule.deleteMany({});
        
        // Chèn các rule mới
        await Rule.insertMany(rulesSeeder);
        console.log("Seeder đã chạy thành công!");

        // Đóng kết nối
        mongoose.connection.close();
    } catch (error) {
        console.error("Lỗi khi chạy seeder:", error);
        mongoose.connection.close();
    }
};

// Chạy hàm seeder
seedRules();
