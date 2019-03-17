/**
 * Mục đích: Quản lý người dùng
 * Người tạo: Cybersoft
 * Ngày tạo: 10/03/2019
 */

var quanLyNguoiDung = new DanhSachNguoiDung();

// Lấy dữ liệu từ Local Storage
LoadDuLieu();


// ------===========  GÁN CÁC SỰ KIỆN ============------

/**
 * Mục đích: Xử lý sự kiện hiển trị popup thêm mới
 * Người tạo:
 * Ngày tạo:
 */
$('#btnThemNguoiDung').click(function () {
    // Đổi nội dung header
    $('#myModal .modal-title').html('Thêm mới người dùng');
    // Đổi nội dung footer
    $('#myModal .modal-footer').html(`
        <button type="button" class="btn btn-primary" id="btnThemMoi">Thêm mới</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
    `);
});

/**
 * Mục đích: Xử lý sự kiện thêm mới người dùng
 * Người tạo:
 * Ngày tạo:
 */
$('body').delegate('#btnThemMoi', 'click', function () {
    // Bước 1: Lấy ra đối tượng người dùng
    var nguoiDung = LayThongTinNguoiDung();
    // Bước 2: Kiểm tra tài khoản bị trùng
    if (!quanLyNguoiDung.KiemTraTrungTaiKhoan(nguoiDung.taiKhoan)) {
        // Nếu ko bị trùng thì thêm vào mảng
        quanLyNguoiDung.ThemNguoiDung(nguoiDung);
        ShowAlert("Thông báo!", "Thêm mới thành công!", "success");

        SetLocalStore(quanLyNguoiDung.dsNguoiDung);
        LoadDuLieu();
    }
    else {
        ShowAlert("Thông báo!", "Tài khoản bị trùng!", "error");
    }
});


/**
 * Mục đích: Xóa người dùng
 * Người tạo:
 * Ngày tạo:
 */
$('body').delegate('.btnXoa', 'click', function () {
    // Bước 1: Lấy tài khoản người dùng dựa vào attribute data-taikhoan
    var taiKhoan = $(this).data('taikhoan');
    // Gọi tới hàm xóa người dùng của đối tượng DS người dùng
    quanLyNguoiDung.XoaNguoiDung(taiKhoan);
    // Hiểm thị thông báo
    ShowAlert("Thông báo!", "Xóa thành công!", "success");
    // Load lại bảng 
    SetLocalStore(quanLyNguoiDung.dsNguoiDung);
    LoadDuLieu();
});


// -----===========  ĐỊNH NGHĨA CÁC FUNCTION ==========--------

/**
 * Mục đích: Load dữ liệu ra bảng
 * Người tạo:
 * Ngày tạo:
 */
function LoadDuLieu() {

    // Lấy dữ liệu từ local storage
    var mangNguoiDung = GetLocalStore();

    var noiDung = '';
    // Lặp mảng
    for (let i = 0; i < mangNguoiDung.length; i++) {
        // Tạo dòng
        noiDung += `
            <tr>
                <td>${i + 1}</td>
                <td>${ mangNguoiDung[i].taiKhoan}</td>
                <td>${ mangNguoiDung[i].matKhau}</td>
                <td>${ mangNguoiDung[i].hoTen}</td>
                <td>${ mangNguoiDung[i].email}</td>
                <td>${ mangNguoiDung[i].soDT}</td>
                <td>
                    <button class="btn btn-info btnSua" data-taikhoan="${mangNguoiDung[i].taiKhoan}">Sửa</button>
                    <button class="btn btn-danger btnXoa" data-taikhoan="${mangNguoiDung[i].taiKhoan}">Xóa</button>
                </td>
            </tr>
        `;

    }
    // Đổ dữ liệu vào table
    $('#tblDanhSachNguoiDung').html(noiDung);
}

/**
 * Mục đích: Hiển thị thông báo
 * Người tạo:
 * Ngày tạo:
 * Tham số:
 *  - title: Tiêu đề
 *  - message: Thông báo
 *  - type: Kiểu thông báo
 */
function ShowAlert(title, message, type) {
    swal(title, message, type);
}

/**
 * Mục đích lấy thông tin người dùng nhập vào từ form
 * Người tạo: 
 * Ngày tạo:
 * Tham số:
 * Trả về:
 *  - nguoiDung: Đối tượng người dùng
 */
function LayThongTinNguoiDung() {
    // Bước 1: DOM tới các ô input để lấy dữ liệu
    var taiKhoan = $('#TaiKhoan').val();
    var matKhau = $('#MatKhau').val();
    var email = $('#Email').val();
    var soDT = $('#SoDienThoai').val();
    var hoTen = $('#HoTen').val();

    // Bước 2: Tạo đối tượng người dùng
    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT);

    // Bước 3: Trả về đối tượng người dùng
    return nguoiDung;
}


function SetLocalStore(mangNguoiDung) {
    localStorage.setItem("dsNguoiDung", JSON.stringify(mangNguoiDung));
}

function GetLocalStore() {
    var mangNguoiDung = [];
    if(localStorage.getItem('dsNguoiDung') != null){
        var chuoi = localStorage.getItem('dsNguoiDung');
        mangNguoiDung = JSON.parse(chuoi);
    }
    return mangNguoiDung;
}