const mongoose = require('mongoose');
const Event = require('../models/event.model'); // Đảm bảo đường dẫn đúng với file model của bạn

// Kết nối với MongoDB
mongoose.connect('mongodb+srv://bachoilabach:bach112003@clustertiktok.yl656aq.mongodb.net/expert_system', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.error('MongoDB connection error:', err));

// Danh sách dữ liệu cần thêm
const events = [
	{ eventId: 'M1', description: 'Màn hình đen (không hiển thị, không lên nguồn)' },
	{ eventId: 'M2', description: 'Điểm chết hoặc vùng cảm ứng không nhạy' },
	{ eventId: 'M3', description: 'Ánh sáng màn hình không đều (sáng góc hoặc tối cục bộ)' },
	{ eventId: 'M4', description: 'Màn hình bị ám màu (ám xanh, ám vàng, ám tím)' },
	{ eventId: 'M5', description: 'Màn hình, cảm ứng và ánh sáng hoạt động bình thường' },
	{ eventId: 'P1', description: 'Sập nguồn đột ngột dù còn pin' },
	{ eventId: 'P2', description: 'Pin sạc không vào hoặc phần trăm không tăng' },
	{ eventId: 'P3', description: 'Pin bị phồng, thiết bị nóng bất thường khi sạc' },
	{ eventId: 'P4', description: 'Máy báo pin ảo (mức pin thay đổi thất thường)' },
	{ eventId: 'P5', description: 'Máy sạc pin quá chậm dù sử dụng sạc nhanh chính hãng' },
	{ eventId: 'P6', description: 'Cổng sạc hoạt động bình thường' },
	{ eventId: 'P7', description: 'Pin và nguồn hoạt động ổn định, không có hiện tượng bất thường' },
	{ eventId: 'A1', description: 'Loa ngoài không phát ra âm thanh' },
	{ eventId: 'A2', description: 'Âm thanh bị nhiễu hoặc rè' },
	{ eventId: 'A3', description: 'Tai nghe không nhận hoặc âm thanh mono chỉ phát một bên' },
	{ eventId: 'A4', description: 'Loa trong không hoạt động khi thực hiện cuộc gọi' },
	{ eventId: 'A5', description: 'Loa bình thường' },
	{ eventId: 'A6', description: 'Tai nghe hoạt động bình thường' },
	{ eventId: 'C1', description: 'Camera sau không hoạt động, không lấy nét được' },
	{ eventId: 'C2', description: 'Camera trước mở bị đơ, không hiện hình' },
	{ eventId: 'C3', description: 'Camera bị ám màu (ảnh chụp bị ám xanh, ám vàng)' },
	{ eventId: 'C4', description: 'Camera bị lóa sáng khi chụp ảnh trong điều kiện ánh sáng mạnh' },
	{ eventId: 'C5', description: 'Camera trước và sau hoạt động ổn định, không gặp lỗi' },
	{ eventId: 'K1', description: 'Wi-Fi yếu, không thể kết nối mạng' },
	{ eventId: 'K2', description: 'Bluetooth không hoạt động, không tìm thấy thiết bị' },
	{ eventId: 'K3', description: 'Không nhận thẻ SIM, lỗi mạng di động' },
	{ eventId: 'K4', description: 'Không thể kết nối mạng di động 5G (hoặc 4G) dù có sóng' },
	{ eventId: 'K5', description: 'Không thể kết nối AirDrop hoặc kết nối không ổn định với các thiết bị Apple khác' },
	{ eventId: 'K6', description: 'Wi-Fi, Bluetooth và mạng di động hoạt động bình thường' },
	{ eventId: 'S1', description: 'Face ID không hoạt động hoặc lỗi nhận diện' },
	{ eventId: 'S2', description: 'Cảm biến tiệm cận không tắt màn hình khi gọi' },
	{ eventId: 'S3', description: 'Cảm biến vân tay (Touch ID) không hoạt động, nhận diện sai' },
	{ eventId: 'S4', description: 'Tất cả cảm biến, Face ID hoạt động bình thường' },
	{ eventId: 'H1', description: 'Nút nguồn không phản hồi' },
	{ eventId: 'H2', description: 'Nút âm lượng hoặc công tắc rung không hoạt động' },
	{ eventId: 'H3', description: 'Nút Home không hoạt động hoặc phản hồi chậm' },
	{ eventId: 'H4', description: 'Các phím cứng hoạt động bình thường, không gặp sự cố' },
	{ eventId: 'H5', description: 'Nút nguồn hoạt động bình thường' },
	{ eventId: 'H6', description: 'Nút Home hoạt động bình thường' },
	{ eventId: 'X1', description: 'Máy treo logo táo khi khởi động' },
	{ eventId: 'X2', description: 'Không nhận kết nối cáp Lightning' },
	{ eventId: 'X3', description: 'Máy tự khởi động lại liên tục' },
	{ eventId: 'X4', description: 'Máy báo lỗi phần mềm liên tục, không thể cập nhật hệ điều hành' },
	{ eventId: 'X6', description: 'Thiết bị khởi động bình thường, không gặp lỗi hệ thống' }
];

// Hàm để chèn dữ liệu vào MongoDB
const seedEvents = async () => {
	try {
		await Event.deleteMany(); // Xóa tất cả dữ liệu cũ
		await Event.insertMany(events); // Thêm dữ liệu mới
		console.log('Data seeded successfully');
		process.exit(); // Thoát khi hoàn tất
	} catch (error) {
		console.error('Error seeding data:', error);
		process.exit(1);
	}
};

// Gọi hàm seeder
seedEvents();
