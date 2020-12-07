<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!doctype html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <base href="${pageContext.servletContext.contextPath}" />
  <title>Quản lý nhân viên</title>

  <!-- Custom fonts for this template-->
  <link href="${pageContext.servletContext.contextPath}/vendor/fontawesome-free/css/all.min.css" rel="stylesheet"
    type="text/css">
  <link
    href="${pageContext.servletContext.contextPath}/https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
    rel="stylesheet">

  <!-- Custom styles for this template-->
  <link href="${pageContext.servletContext.contextPath}/css/sb-admin-2.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">


</head>

<body id="page-top">

  <!-- Page Wrapper -->
  <div id="wrapper">

    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <jsp:include page="../layout/navigator.jsp" flush="true" />

    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <jsp:include page="../layout/topbar.jsp" flush="true" />



        </nav>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">






          <!-- Modal 1 -->
          <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="myModalLabel">Thêm phòng ban</h4>
                </div>
                <div class="modal-body">

                  <div class="panel panel-default">
                    <div class="panel-body">


                      <form:form modelAttribute="depart" method="POST">
                        <div class="form-group">
                          <label for="">Mã phòng</label>
                          <form:input path="depart_id" class="form-control" placeholder="" />
                        </div>

                        <div class="form-group">
                          <label for="">Tên phòng</label>
                          <form:input path="name" class="form-control" aria-describedby="helpId" placeholder="" />
                        </div>




                    </div>
                    <div class="panel-footer">Vui lòng nhập thông tin phòng ban</div>
                  </div>


                </div>
                <div class="modal-footer">
                  <div class="panel-footer">
                    <button class="btn btn-primary" value="insert" name="insert">Thêm</button>
                    <button hidden="" value="update" class="btn btn-primary" name="update">Cập nhật</button></div>

                  </form:form>

                  <button data-dismiss="modal" type="button" class=" btn btn-default">
                    <span class="glyphicon glyphicon-stop" aria-hidden="true"></span>
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>







          <!-- DataTales Example -->
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Quản lý phòng ban</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Mã phòng<i class="fa fa-fw fa-sort"></i></th>
                      <th>Tên phòng<i class="fa fa-fw fa-sort"></i></th>
                      <th>
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary btn-sm" data-toggle="modal"
                          data-target="#myModal">Thêm phòng
                          ban</button></th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Mã phòng</th>
                      <th>Tên phòng</th>
                      <th></th>
                    </tr>
                  </tfoot>
                  <tbody>
                    <c:forEach var="s" items="${departs}">
                      <tr>
                        <td>${s.depart_id}</td>
                        <td>${s.name}</td>
                        <td>
                          <a href="#" class="btn btn-danger btn-icon-split btn-sm" data-toggle="modal"
                            data-target="#logoutModal-${s.depart_id}">
                            <span class="icon text-white-50">
                              <i class="fas fa-trash"></i>
                            </span>
                            <span class="text">Xóa</span>
                          </a>


                          <a href="?id=${s.depart_id}&edit=edit" class="btn btn-info btn-icon-split btn-sm" data-toggle="modal"
                            data-target="#myModal-${s.depart_id}">
                            <span class="icon text-white-50">
                              <i class="fas fa-info-circle"></i>
                            </span>
                            <span class="text">Sửa</span>
                          </a>
                        </td>
                      </tr>



                      <!-- Modal 2 -->
                      <div class="modal fade" id="myModal-${s.depart_id}" tabindex="-1" role="dialog"
                        aria-labelledby="myModalLabel">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h4 class="modal-title" id="myModalLabel">Sửa phòng ban</h4>
                            </div>
                            <div class="modal-body">

                              <div class="panel panel-default">
                                <div class="panel-body">


                                  <form:form modelAttribute="depart" method="POST">
                                    <div class="form-group">
                                      <label for="">Mã phòng</label>
                                      <input id="depart_id" name="depart_id" class="form-control" placeholder=""
                                        value="${s.depart_id}" />
                                    </div>

                                    <div class="form-group">
                                      <label for="">Tên phòng</label>
                                      <input id="name" name="name" class="form-control" aria-describedby="helpId"
                                        value="${s.name}" placeholder="" />
                                    </div>




                                </div>
                                <div class="panel-footer">Vui lòng nhập thông tin phòng ban</div>
                              </div>


                            </div>
                            <div class="modal-footer">
                              <div class="panel-footer">
                                <button hidden="" class="btn btn-primary" value="insert" name="insert">Thêm</button>
                                <button value="update" class="btn btn-primary" name="update">Cập nhật</button>
                              </div>

                              </form:form>

                              <button data-dismiss="modal" type="button" class=" btn btn-default">
                                <span class="glyphicon glyphicon-stop" aria-hidden="true"></span>
                                Hủy
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Modal 2 -->


                      <!-- Delete Modal-->
                      <div class="modal fade" id="logoutModal-${s.depart_id}" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Xoá phòng ban</h5>
                              <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                              </button>
                            </div>
                            <div class="modal-body">Xác nhận xoá phòng ban ${s.name} không?
                            </div>
                            <div class="modal-footer">
                              <button class="btn btn-secondary" type="button" data-dismiss="modal">Huỷ</button>
                              <a class="btn btn-primary" href="delete/${s.depart_id}">Xác nhận</a>
                            </div>
                          </div>
                        </div>
                      </div>

                    </c:forEach>
                  </tbody>
                </table>
              </div>
            </div>
          </div>



          <!-- /.container-fluid -->




















        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="sticky-footer bg-white">
          <jsp:include page="../layout/footer.jsp" flush="true" />
        </footer>
        <!-- End of Footer -->

      </div>
      <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <a class="btn btn-primary" href="login.html">Logout</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript-->
    <script src="${pageContext.servletContext.contextPath}/vendor/jquery/jquery.min.js"></script>
    <script src="${pageContext.servletContext.contextPath}/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="${pageContext.servletContext.contextPath}/vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="${pageContext.servletContext.contextPath}/js/sb-admin-2.min.js"></script>
    <!-- Page level plugins -->
    <script src="${pageContext.servletContext.contextPath}/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="${pageContext.servletContext.contextPath}/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="${pageContext.servletContext.contextPath}/js/demo/datatables-demo.js"></script>




</body>

</html>