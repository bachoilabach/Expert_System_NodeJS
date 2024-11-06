const mongoose = require('mongoose');
const Conclusion = require('../models/conclusion.model'); // Đảm bảo đường dẫn tới model Conclusion là chính xác

const conclusionsSeeder = [
    { conclusionId: "KL1", description: "Lỗi màn hình. Thay màn hình hoặc kiểm tra cáp màn hình" },
    { conclusionId: "KL2", description: "Lỗi pin và nguồn. Thay pin mới hoặc Kiểm tra và thay thế IC sạc" },
    { conclusionId: "KL5", description: "Loa hỏng hoặc mạch âm thanh lỗi. Kiểm tra và thay loa hoặc Kiểm tra mạch âm thanh trên bo mạch chính" },
    { conclusionId: "KL6", description: "Tai nghe hỏng hoặc Mạch âm thanh lỗi. Vệ sinh và kiểm tra jack cắm tai nghe hoặc Kiểm tra và sửa chữa mạch âm thanh" },
    { conclusionId: "KL7", description: "Jack cắm tai nghe lỗi hoặc Mạch âm thanh lỗi. Kiểm tra và thay jack cắm tai nghe hoặc sử dụng tai nghe chính hãng hoặc kiểm tra mạch âm thanh" },
    { conclusionId: "KL8", description: "Lỗi cảm biến hình ảnh hoặc thấu kính bị hỏng, bị bẩn. Kiểm tra và làm sạch thấu kính hoặc Kiểm tra cảm biến hình ảnh" },
    { conclusionId: "KL9", description: "Lỗi khe cắm SIM hoặc Lỗi anten hoặc mô-đun mạng. Kiểm tra khe SIM hoặc Kiểm tra thẻ SIM" },
    { conclusionId: "KL10", description: "Lỗi cảm biến vân tay (Touch ID). Kiểm tra hoặc thay thế cảm biến" },
    { conclusionId: "KL11", description: "Cáp kết nối bị lỏng hoặc đứt hoặc Lỗi mạch điện hoặc bo mạch chủ. Thay thế hoặc sửa chữa cáp kết nối nút với bo mạch chủ" },
    { conclusionId: "KL12", description: "Pin bị hỏng, chai hoặc gặp sự cố về điện năng. Kiểm tra và thay thế pin" },
    { conclusionId: "KL13", description: "Cáp kết nối màn hình có thể lỏng hoặc bị hư hỏng khiến ánh sáng hiển thị không đều" },
    { conclusionId: "KL14", description: "Lỗi liên quan đến tấm nền màn hình (LCD/LED) hoặc do lỗi trong mạch điều khiển màu sắc" },
    { conclusionId: "KL15", description: "Do loa trong bị hỏng hoặc dây kết nối đến bo mạch chính gặp sự cố" },
    { conclusionId: "KL16", description: "Nút nguồn bị hỏng vật lý hoặc do sự cố trong kết nối với bo mạch" },
    { conclusionId: "KL17", description: "Lỗi cảm biến quang học. Làm sạch cảm biến hoặc nếu hỏng thì thay thế" },
    { conclusionId: "KL18", description: "Nút Home bị hỏng, có thể nó không gửi tín hiệu đến hệ thống. Thay thế nút Home mới" },
    { conclusionId: "KL19", description: "Pin yếu hoặc hỏng. Thay pin mới" },
    { conclusionId: "KL20", description: "Lỗi màn hình hoặc hỏng bo mạch. Kiểm tra và thay thế màn hình hoặc sửa bo mạch" },
    { conclusionId: "KL21", description: "Lỗi nút nguồn hoặc khe SIM hỏng. Kiểm tra và thay nút nguồn hoặc khe SIM" },
    { conclusionId: "KL22", description: "Lỗi kết nối mạng hoặc mạch âm thanh. Kiểm tra và sửa lại kết nối Wi-Fi hoặc mạch âm thanh" },
    { conclusionId: "KL23", description: "Màn hình hỏng hoặc kết nối nút Home lỗi. Kiểm tra và thay thế màn hình hoặc sửa kết nối nút Home" },
    { conclusionId: "KL24", description: "Pin hỏng hoặc IC quản lý pin lỗi. Thay pin mới hoặc sửa IC quản lý pin" },
    { conclusionId: "KL25", description: "Lỗi camera hoặc lỗi màn hình. Kiểm tra và thay thế camera sau hoặc sửa màn hình" }
];

// Hàm để chèn dữ liệu seeder vào MongoDB
const seedConclusions = async () => {
    try {
        await mongoose.connect('mongodb+srv://bachoilabach:bach112003@clustertiktok.yl656aq.mongodb.net/expert_system', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        // Xóa các conclusion cũ nếu cần
        await Conclusion.deleteMany({});
        
        // Chèn các conclusion mới
        await Conclusion.insertMany(conclusionsSeeder);
        console.log("Seeder đã chạy thành công!");

        // Đóng kết nối
        mongoose.connection.close();
    } catch (error) {
        console.error("Lỗi khi chạy seeder:", error);
        mongoose.connection.close();
    }
};

// Chạy hàm seeder
seedConclusions();
