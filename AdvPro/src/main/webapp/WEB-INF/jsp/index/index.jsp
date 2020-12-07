<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
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
    href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
    rel="stylesheet">

  <!-- Custom styles for this template-->
  <link href="${pageContext.servletContext.contextPath}/css/sb-admin-2.min.css" rel="stylesheet">
  <style>
    #video_background {
      position: absolute;
      z-index: 0;
      overflow: hidden;
    }

    #img_top {
      position: absolute;
      width: 150px;
      height: 200px;
      top: 402px;
      left: 770px;
      border: 2px;
      padding: 10px;
      border-radius: 30px 30px 15px 16px;
    }

    #banner_Top {
      position: absolute;


      width: 319px;
      height: 54px;
      top: 303px;
      left: 692px;


      border: 2px;
      padding: 10px;
      border-radius: 30px 30px 15px 16px;

    }

    #ten_TOp {
      position: absolute;
      width: 319px;
      height: 54px;
      top: 340px;
      left: 692px;

    }
  </style>
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
          <div class="video-bg">
            <video style=" width: 1200px; height: 681px;" id="video_background" autoplay="" loop=""
              class="hide-on-mobile">
              <source src="${pageContext.servletContext.contextPath}/video/HOF_BG.mp4" type='video/mp4'> >
              <source src="${pageContext.servletContext.contextPath}/video/HOF_BG.webm" type="video/webm" />
            </video>
            <img src="${pageContext.servletContext.contextPath}/img/${top1[2]}.jpg" alt="" id=img_top>

            <p id="banner_Top" class="btn btn-primary btn-icon-split">
              <span class="icon text-white-50">
                <i class="fas fa-flag"></i>
              </span>
              <span class="text">Nhân viên xuất sắc nhất</span>
              <span class="icon text-white-50">
                <i class="fas fa-flag"></i>
              </span>
            </p>



            <div id="ten_TOp" class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-success text-uppercase mb-1" style="font-size: 1.0rem">Phòng ban: ${top1[1]} </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800" style="color: #FF6300!important">Họ và tên: ${top1[0]}</div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
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
  <script src="${pageContext.servletContext.contextPath}/vendor/chart.js/Chart.min.js"></script>

  <!-- Page level custom scripts -->
  <script src="${pageContext.servletContext.contextPath}/js/demo/chart-area-demo.js"></script>
  <script src="${pageContext.servletContext.contextPath}/js/demo/chart-pie-demo.js"></script>

</body>

</html>