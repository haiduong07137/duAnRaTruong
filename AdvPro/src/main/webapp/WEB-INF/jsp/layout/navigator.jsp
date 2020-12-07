<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Lê Tân <sup>69</sup></div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <a class="nav-link" href="/index/">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Trang chủ</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">


      <c:if test="${sessionScope.userlogin == null}">
         
      </c:if>
    
      <c:if test="${sessionScope.userlogin != null}">
        <div class="sidebar-heading">
          Quản lý
        </div>
  
        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
          <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
            <i class="fas fa-fw fa-cog"></i>
            <span>Chức năng quản lý</span>
          </a>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
              <a class="collapse-item" href="/depart/">Phòng ban</a>
              <a class="collapse-item" href="/staff/">Nhân viên</a>
              <a class="collapse-item" href="/user/">Tài khoản</a>
            </div>
          </div>
        </li>
    <!-- Divider -->
    <hr class="sidebar-divider">
  
        <!-- Nav Item - Utilities Collapse Menu -->
        <li class="nav-item">
          <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
            <i class="fas fa-fw fa-wrench"></i>
            <span>Thành tích và kỷ luật</span>
          </a>
          <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Chức năng ghi nhận</h6>
              <a class="collapse-item" href="/record/">Ghi nhận thành tích và<br> kỷ luật</a>
              <a class="collapse-item" href="/record/history">Lịch sử ghi nhận</a>
         
            </div>
          </div>
        </li>
  
      
      
  
        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">
  
      </c:if>


      <!-- Heading -->
    
      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
      </div>