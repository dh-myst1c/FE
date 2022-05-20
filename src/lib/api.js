import axios from "axios";
import moment from "moment";
// const FIREBASE_DOMAIN = "https://practice-e56ad-default-rtdb.firebaseio.com";

const BACKEND_DOMAIN = "http://localhost:8000";
// const BACKEND_DOMAIN = "";
const toStr = (arr) => {
  let res = "";
  for (let i = 0; i < arr.length; i++) {
    res += arr[i] + " ";
  }
  return res.trim();
};
// Tổng quan
export async function getOverview() {
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/api/tong-quan`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) window.location.reload();
  }
}
export async function getDatRot() {
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/api/dat-rot`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) window.location.reload();
    throw new Error("Lỗi server");
  }
}
// Học sinh
export async function getAllStudents() {
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/api/hoc-sinh`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const data = await response.data;

    for (var i = 0; i < data.length; i++) {
      data[i].id = data[i].maHS;
    }
    return data;
  } catch (error) {
    if (error.response.status === 401) window.location.reload();
  }
}
export async function getStudentById(id) {
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/api/hoc-sinh/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });

    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
  }
}
export async function getDetailStudentById(id) {
  try {
    const response = await axios.get(
      `${BACKEND_DOMAIN}/api/chi-tiet-hs/${id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );

    const data = await response.data;
    for (var i = 0; i < data.qth.length; i++) {
      for (var j = 0; j < data.qth[i].bangDiem.length; j++) {
        data.qth[i].bangDiem[j].diemMieng = toStr(
          data.qth[i].bangDiem[j].diemMieng
        );
        data.qth[i].bangDiem[j].diem15P = toStr(
          data.qth[i].bangDiem[j].diem15P
        );
        data.qth[i].bangDiem[j].diem1Tiet = toStr(
          data.qth[i].bangDiem[j].diem1Tiet
        );
        data.qth[i].bangDiem[j].diemHK = toStr(data.qth[i].bangDiem[j].diemHK);
      }
    }
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
  }
}
export async function getTopStudents(request) {
  try {
    const response = await axios.get(
      `${BACKEND_DOMAIN}/api/top-hs/${request.maHK}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    const data = await response.data;

    for (var i = 0; i < data.length; i++) {
      data[i].id = data[i].maHS;
    }
    return data;
  } catch (error) {
    if (error.response.status === 401) window.location.reload();
  }
}
export async function addStudent(request) {
  var formData = new FormData();
  formData.append("hoTen", request.hoTen);
  formData.append("gioiTinh", request.gioiTinh);
  formData.append(
    "ngaySinh",
    moment(request.ngaySinh, "DD/MM/YYYY").format("YYYY-MM-DD")
  );
  formData.append("diaChi", request.diaChi);
  formData.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/api/hoc-sinh`,

      formData
    );
    const data = await response.data;

    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    if (error.response.status === 422) {
      throw new Error(
        error.response.data.message ||
          "Vui lòng kiểm tra thông tin các trường đã nhập"
      );
    }
  }
}

export async function editStudent(request) {
  var params = new URLSearchParams();
  params.append("hoTen", request.hoTen);
  params.append("gioiTinh", request.gioiTinh);
  params.append(
    "ngaySinh",
    moment(request.ngaySinh, "DD/MM/YYYY").format("YYYY-MM-DD")
  );
  params.append("diaChi", request.diaChi);
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.put(
      `${BACKEND_DOMAIN}/api/hoc-sinh/${request.maHS}`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = await response.data;

    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    if (error.response.status === 422) {
      throw new Error(
        error.response.data.message ||
          "Vui lòng kiểm tra thông tin các trường đã nhập"
      );
    }
  }
}
export async function delStudents(request) {
  var params = new URLSearchParams();
  params.append("maHS", JSON.stringify(request.maHS));
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/api/hoc-sinh/delete`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Not auth.");
    }

    throw new Error(error.response.data.message || "Lỗi server");
  }
}
// Lớp
export async function getAllClasses(maHK) {
  const response = await axios.get(`${BACKEND_DOMAIN}/api/lop&maHK=${maHK}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  try {
    const data = await response.data;

    for (var i = 0; i < data.length; i++) {
      data[i].id = data[i].maLop;
    }
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
  }
}
export async function getTopClasses(request) {
  try {
    const response = await axios.get(
      `${BACKEND_DOMAIN}/api/top-lop/${request.maHK}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    const data = await response.data;

    for (var i = 0; i < data.length; i++) {
      data[i].id = data[i].maTKHK;
    }
    return data;
  } catch (error) {
    if (error.response.status === 401) window.location.reload();
  }
}
export async function addClass(request) {
  var formData = new FormData();
  formData.append("tenLop", request.tenLop);
  formData.append("maKhoi", request.maKhoi);
  formData.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.post(`${BACKEND_DOMAIN}/api/lop`, formData);
    const data = await response.data;

    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    throw new Error(error.response.data.message || "Lỗi server");
  }
}
export async function getClassesById(id) {
  try {
    const response = await axios.get(
      `${BACKEND_DOMAIN}/api/lop/${id[0]}/${id[1]}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    const data = await response.data;
    for (var i = 0; i < data.hocSinh.length; i++) {
      data.hocSinh[i].id = data.hocSinh[i].maHS;
    }
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
  }
}
export async function getStudentsEmpty(id) {
  try {
    const response = await axios.get(
      `${BACKEND_DOMAIN}/api/hoc-sinh-trong/${id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    const data = await response.data;
    for (var i = 0; i < data.length; i++) {
      data[i].id = data[i].maHS;
    }
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
  }
}
export async function addStudentsToClass(request) {
  var params = new URLSearchParams();
  params.append("maHS", JSON.stringify(request.maHS));
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/api/lop/${request.maLop}/${request.maHK}`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập.");
    }
    throw new Error(error.response.data.message || "Lỗi server");
  }
}

export async function delStudentsFromClass(request) {
  var params = new URLSearchParams();
  params.append("maHS", JSON.stringify(request.maHS));
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/api/lop/xoa-hoc-sinh/${request.maLop}/${request.maHK}`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Not auth.");
    }

    throw new Error(error.response.data.message || "Lỗi server");
  }
}
export async function editStudentOfClass(request) {
  var params = new URLSearchParams();
  params.append("tinhTrangBaoHiem", request.tinhTrangBaoHiem);
  params.append("tinhTrangHocPhi", request.tinhTrangHocPhi);
  params.append("hanhKiem", request.hanhKiem);
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.put(
      `${BACKEND_DOMAIN}/api/qth/${request.maQTH}`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập.");
    }
  }
}
export async function getTeachersEmptyHK(maHK) {
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/api/gv-trong/${maHK}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const data = await response.data;
    for (var i = 0; i < data.length; i++) {
      data[i].id = data[i].maGV;
    }
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
  }
}
export async function editCanBoLop(request) {
  var params = new URLSearchParams();
  params.append("maGVCN", request.maGVCN);
  params.append("maLT", request.maLT);
  params.append("maLop", request.maLop);
  params.append("maHK", request.maHK);
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.put(`${BACKEND_DOMAIN}/api/qll`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập.");
    }
    throw new Error("Lỗi server");
  }
}
// Chương trình học
export async function getAllCourses() {
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/api/cth`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const data = await response.data;
    for (var i = 0; i < data.length; i++) {
      data[i].id = data[i].maCTH;
    }
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("Chưa đăng nhập");
    }
  }
}
export async function addCourse(request) {
  var params = new URLSearchParams();
  params.append("maMH", request.maMH);
  params.append("maKhoi", request.maKhoi);
  params.append("heSo", request.heSo);
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.post(`${BACKEND_DOMAIN}/api/cth`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    if (error.response.status === 422) {
      throw new Error(
        error.response.data.message || "Các trường bị sai thông tin"
      );
    }
  }
}
export async function editCourse(request) {
  var params = new URLSearchParams();
  params.append("maMH", request.maMH);
  params.append("maKhoi", request.maKhoi);
  params.append("heSo", request.heSo);
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.put(
      `${BACKEND_DOMAIN}/api/cth/${request.maCTH}`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    if (error.response.status === 422) {
      throw new Error(
        error.response.data.message || "Các trường bị sai thông tin"
      );
    }
  }
}
export async function delCourses(request) {
  var params = new URLSearchParams();
  params.append("maCTH", JSON.stringify(request.maCTH));
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/api/cth/delete`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Not auth.");
    }

    throw new Error(error.response.data.message || "Lỗi server");
  }
}
//  Môn học
export async function getAllSubjects() {
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/api/mon-hoc`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const data = await response.data;
    for (var i = 0; i < data.length; i++) {
      data[i].id = data[i].maMH;
    }
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
  }
}

export async function addSubject(request) {
  var formData = new FormData();
  formData.append("tenMH", request.tenMH);
  formData.append("diemDat", request.diemDat);
  formData.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/api/mon-hoc`,
      formData
    );
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response) {
    }
    console.log(error.response);
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Not auth.");
    }
    if (error.response.status === 422) {
      throw new Error(
        error.response.data.message || "Các trường bị sai thông tin"
      );
    }
  }
}

export async function getSubjectById(id) {
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/api/mon-hoc/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }

    throw new Error("Lỗi server");
  }
}

export async function editSubject(request) {
  var params = new URLSearchParams();
  params.append("tenMH", request.tenMH);
  params.append("diemDat", request.diemDat);
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.put(
      `${BACKEND_DOMAIN}/api/mon-hoc/${request.maMH}`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    if (error.response.status === 422) {
      throw new Error(
        error.response.data.message || "Các trường bị sai thông tin"
      );
    }
    throw new Error("Lỗi server");
  }
}
export async function delSubjects(request) {
  var params = new URLSearchParams();
  params.append("maMH", JSON.stringify(request.maMH));
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/api/mon-hoc/delete`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Not auth.");
    }

    throw new Error(error.response.data.message || "Lỗi server");
  }
}
// Bảng điểm
export async function getAllTranscripts(info) {
  try {
    const response = await axios.get(
      `${BACKEND_DOMAIN}/api/bang-diem/${info.maHK}/${info.maLop}/${info.maMH}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    const data = await response.data;
    for (var i = 0; i < data.length; i++) {
      data[i].id = data[i].maHS;
      data[i].diemMieng = toStr(data[i].diemMieng);
      data[i].diem15P = toStr(data[i].diem15P);
      data[i].diem1Tiet = toStr(data[i].diem1Tiet);
      data[i].diemHK = toStr(data[i].diemHK);
    }
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    if (error.response.status === 422) {
      throw new Error(
        error.response.data.message || "Các trường bị sai thông tin"
      );
    }
  }
}
export async function editTranscript(request) {
  let response;
  let params = new URLSearchParams();
  params.append("diemMieng", JSON.stringify(request.diemMieng));
  params.append("diem15P", JSON.stringify(request.diem15P));
  params.append("diem1Tiet", JSON.stringify(request.diem1Tiet));
  params.append("diemHK", JSON.stringify(request.diemHK));
  params.append("token", localStorage.getItem("accessToken"));
  try {
    if (!request.maBD) {
      params.append("maMH", JSON.stringify(request.maMH));
      params.append("maQTH", JSON.stringify(request.maQTH));
      response = await axios.post(`${BACKEND_DOMAIN}/api/bang-diem`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } else {
      response = await axios.put(
        `${BACKEND_DOMAIN}/api/bang-diem/${request.maBD}`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    }
    const data = await response.data;

    for (var i = 0; i < data.length; i++) {
      data[i].id = data[i].maHS;
    }
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    throw new Error("Lỗi server");
  }
}
// Tất cả lớp, học kì, môn học
export async function getAllClassesSemSub() {
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/api/lop-hk-mh`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    throw new Error("Lỗi server");
  }
}
//  Tất cả học kì
export async function getAllSems() {
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/api/hk`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    throw new Error("Lỗi server");
  }
}
// Báo cáo tổng kết môn
export async function getTKMByForegin(request) {
  try {
    const response = await axios.get(
      `${BACKEND_DOMAIN}/api/tkm/${request.maHK}/${request.maMH}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    const data = await response.data;
    for (var i = 0; i < data.length; i++) {
      data[i].id = data[i].maTKM;
    }
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    throw new Error("Lỗi server");
  }
}
export async function updateTKMByForeign(request) {
  try {
    const response = await axios.put(
      `${BACKEND_DOMAIN}/api/tkm/${request.maHK}/${request.maMH}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    throw new Error("Lỗi server");
  }
}
// Báo cáo tổng kết học kỳ
export async function getTKHKByForegin(request) {
  try {
    const response = await axios.get(
      `${BACKEND_DOMAIN}/api/tkhk/${request.maHK}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    const data = await response.data;
    for (var i = 0; i < data.length; i++) {
      data[i].id = data[i].maTKHK;
    }
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    throw new Error("Lỗi server");
  }
}
export async function updateTKHKByForeign(request) {
  try {
    const response = await axios.put(
      `${BACKEND_DOMAIN}/api/tkhk/${request.maHK}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    throw new Error("Lỗi server");
  }
}
// Tham số
export async function getAllParams() {
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/api/tham-so`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    throw new Error("Lỗi server");
  }
}
export async function editParams(request) {
  let params = new URLSearchParams();
  params.append("thamSo", JSON.stringify(request));
  try {
    const response = await axios.put(`${BACKEND_DOMAIN}/api/tham-so`, params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    throw new Error("Lỗi server");
  }
}
// Người dùng
export async function login(request) {
  var params = new URLSearchParams();
  params.append("email", request.email);
  params.append("password", request.password);
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/api/auth/login`,
      params
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      throw new Error(
        error.response.data.message || "Thông tin đăng nhập không chính xác"
      );
    }
  }
}
export async function logout() {
  var params = new URLSearchParams();
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/api/auth/logout`,
      params
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      throw new Error(
        error.response.data.message || "Thông tin đăng nhập không chính xác"
      );
    }
    throw new Error("Đã có lỗi xảy ra");
  }
}
export async function getAllUsers() {
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/api/auth/users`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("Chưa đăng nhập");
    }
  }
}
export async function getUser() {
  var formData = new FormData();
  formData.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/api/auth/me`,
      formData
    );
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(
        error.response.data.message || "Cần đăng nhập để sử dụng"
      );
    }
  }
}
export async function addUser(request) {
  var params = new URLSearchParams();
  params.append("hoTen", request.hoTen);
  params.append("email", request.email);
  params.append("password", request.password);
  params.append("maNhom", request.maNhom);
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/api/auth/register`,

      params
    );
    const data = await response.data;

    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    if (error.response.status === 422) {
      throw new Error(
        error.response.data.message ||
          "Vui lòng kiểm tra thông tin các trường đã nhập"
      );
    }
    throw new Error("Lỗi server");
  }
}
export async function editUser(request) {
  var params = new URLSearchParams();
  params.append("hoTen", request.hoTen);
  params.append("maNhom", request.maNhom);
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.put(
      `${BACKEND_DOMAIN}/api/auth/user/${request.id}`,

      params
    );
    const data = await response.data;

    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    if (error.response.status === 422) {
      throw new Error(
        error.response.data.message ||
          "Vui lòng kiểm tra thông tin các trường đã nhập"
      );
    }
    throw new Error("Lỗi server");
  }
}
export async function deleteUsers(request) {
  var params = new URLSearchParams();
  params.append("id", JSON.stringify(request.id));
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/api/auth/users/delete`,

      params
    );
    const data = await response.data;

    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    if (error.response.status === 404) {
      throw new Error(
        error.response.data.message || "Không tìm thấy người dùng"
      );
    }
    throw new Error("Lỗi server");
  }
}
export async function resetPassword(id) {
  var params = new URLSearchParams();
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/api/auth/reset/user/${id}`,

      params
    );
    const data = await response.data;

    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    if (error.response.status === 404) {
      throw new Error(
        error.response.data.message || "Không tìm thấy người dùng"
      );
    }
    throw new Error("Lỗi server");
  }
}
export async function editProfile(request) {
  var params = new URLSearchParams();
  params.append("hoTen", request.hoTen);
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.put(
      `${BACKEND_DOMAIN}/api/profile/${request.id}`,
      params
    );
    const data = await response.data;

    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    if (error.response.status === 422) {
      throw new Error(
        error.response.data.message ||
          "Vui lòng kiểm tra thông tin các trường đã nhập"
      );
    }
    throw new Error("Lỗi server");
  }
}
export async function editPassword(request) {
  var params = new URLSearchParams();
  params.append("matKhauCu", request.matKhauCu);
  params.append("matKhauMoi", request.matKhauMoi);
  params.append("token", localStorage.getItem("accessToken"));
  try {
    const response = await axios.put(
      `${BACKEND_DOMAIN}/api/change-password/${request.id}`,
      params
    );
    const data = await response.data;

    return data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error(error.response.data.message || "Chưa đăng nhập");
    }
    if (error.response.status === 422) {
      throw new Error(
        error.response.data.message ||
          "Vui lòng kiểm tra thông tin các trường đã nhập"
      );
    }
    throw new Error("Lỗi server");
  }
}
