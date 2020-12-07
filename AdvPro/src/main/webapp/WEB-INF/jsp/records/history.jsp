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
  <style>
    .nowrap {
      white-space: nowrap;
    }
  </style>
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
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













          <!-- DataTales Example -->
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Quản lý nhân viên</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Mã nhân viên<i class="fa fa-fw fa-sort"></i></th>
                      <th>Tên nhân viên<i class="fa fa-fw fa-sort"></i></th>
                      <th>Ghi nhận<i class="fa fa-fw fa-sort"></i></th>
                      <th>Lý do<i class="fa fa-fw fa-sort"></i></th>
                      <th>Ngày<i class="fa fa-fw fa-sort"></i></th>
                      <th>Phòng ban<i class="fa fa-fw fa-sort"></i></th>
                      
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Mã nhân viên</th>
                      <th>Tên nhân viên</th>
                      <th>Ghi nhận</th>
                      <th>Lý do</th>
                      <th>Ngày</th>
                      <th>Phòng ban</th>
                    
                    </tr>
                  </tfoot>
                  <tbody>
                    <c:forEach var="s" items="${records}">
                      <tr>
                        <td>${s.staff_id.staff_id}</td>
                        <td>${s.staff_id.name}</td>
                        <td>${s.type?"Thành tích":"Kỷ luật"}</td>
                        <td>${s.reason}</td>
                        <td>${s.date}</td>
                        <td>${s.staff_id.depart_id.name}</td>
                      </tr>
 


 


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

    <script src="${pageContext.servletContext.contextPath}/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="${pageContext.servletContext.contextPath}/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="${pageContext.servletContext.contextPath}/js/demo/datatables-demo.js"></script>


</body>

</html>