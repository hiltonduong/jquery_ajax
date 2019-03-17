/**
 * Mục đích: Lớp đối tượng danh sách người dùng
 * Người tạo:
 * Ngày tạo:
 */

function DanhSachNguoiDung() {
    this.dsNguoiDung = [];

    /**
     * Mục đích: Thêm mới 1 người dùng
     * Tham số:
     *     - nguoiDung: Đối tượng người dùng
     */
    this.ThemNguoiDung = function (nguoiDung) {
        this.dsNguoiDung.push(nguoiDung);
    }

    /**
     * Mục đích: Tìm vị trí người dùng trong mảng
     * Tham số:
     * - taiKhoan: tài khoản người dùng
     * Trả về:
     * - index: Vị trí người dùng trong mảng
     */
    this.LayViTri = function (taiKhoan) {
        // Duyệt ds người dùng
        var nguoiDung;
        for (let i = 0; i < this.dsNguoiDung.length; i++) {
            // Lấy ra người dùng ở vị trí thứ i
            nguoiDung = this.dsNguoiDung[i];
            if (nguoiDung.taiKhoan === taiKhoan.toString()) {
                return i; // Tìm thấy => trả về vị trí
            }
        }
        return -1; // Không tìm thấy => Trả về -1
    }

    /**
      * Mục đích: Kiểm tra trùng tên đăng nhập
      * Tham số:
      *     - taiKhoan: Tên tài khoản người dùng
      * Trả về:
      *     - true => tìm thấy trùng
      *     - false => Không tìm thấy bị trùng
      */
    this.KiemTraTrungTaiKhoan = function (taiKhoan) {
        if(this.LayViTri(taiKhoan) > -1){
            return true;
        }
        return false;
    }

    /**
      * Mục đích: Lấy ra 1 người dùng trong mảng
      * Tham số:
      *     - taiKhoan: Tên tài khoản người dùng
      * Trả về:
      *     - nguoiDung: Người dùng ở vị trí thứ i
      */
     this.LayNguoiDung = function (taiKhoan) {
         var viTri = this.LayViTri(taiKhoan);
        if(viTri > -1){
            this.dsNguoiDung[viTri];
        }
        return null;
    }


    /**
     * Mục đích: Cập nhật thông tin người dùng
     * Tham số:
     *     - nguoiDung: Đối tượng người dùng
     */
    this.CapNhatNguoiDung = function (nguoiDung) {
        var viTri = this.LayViTri(nguoiDung.taiKhoan);
        if(viTri > -1){
            this.dsNguoiDung[viTri].hoTen = nguoiDung.hoTen;
            this.dsNguoiDung[viTri].matKhau = nguoiDung.matKhau;
            this.dsNguoiDung[viTri].email = nguoiDung.email;
            this.dsNguoiDung[viTri].soDT = nguoiDung.soDT;
        }
    }

    /**
      * Mục đích: Xóa 1 người dùng trong mảng
      * Tham số:
      *     - taiKhoan: Tên tài khoản người dùng
      */
     this.XoaNguoiDung = function (taiKhoan) {
        var viTri = this.LayViTri(taiKhoan);
        if(viTri > -1){
            this.dsNguoiDung.splice(viTri, 1);
        }
    }


    /**
      * Mục đích: Tìm kiếm người dùng
      * Tham số:
      *     - chuoiTimKiem: Chuỗi ký tự
      * Trả về:
      *     - mangTimKiem: Mảng đối tượng người dùng
      */
     this.TimKiemNguoiDung = function (chuoiTimKiem) {
         // Khai báo mảng kết quả tìm kiếm trả về
        var mangTimKiem = [];
        var nguoiDung;
        // Duyệt mảng
        for (let i = 0; i < this.dsNguoiDung.length; i++) {
            nguoiDung = this.dsNguoiDung[i];
            // indexOf trả về -1 nếu ko tìm thấy
            if(nguoiDung.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1){
                // Thêm người dùng ở vị trí thứ i vào mảng tìm kiếm trả về
                mangTimKiem.push(nguoiDung);
            }
        }
        return mangTimKiem;
    }
}

//  DanhSachNguoiDung.prototype.ThemNguoiDung = function(){

//  }
