<%@ page language="java" contentType="text/html; charset=UTF-8"
 pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- Sidebar Toggle (Topbar) -->
<button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
  <i class="fa fa-bars"></i>
</button>

<!-- Topbar Search -->
<form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
  <div class="input-group">
    <input type="text" class="form-control bg-light border-0 small" placeholder="Tìm kiếm..." aria-label="Search"
      aria-describedby="basic-addon2">
    <div class="input-group-append">
      <button class="btn btn-primary" type="button">
        <i class="fas fa-search fa-sm"></i>
      </button>
    </div>
  </div>
</form>

<!-- Topbar Navbar -->
 

  <c:if test="${sessionScope.userlogin == null}">
    <a class="nav-link " href="${pageContext.servletContext.contextPath}/login/">
      <span class=" ">Đăng nhập</span>
    </a>
  </c:if>

  <c:if test="${sessionScope.userlogin != null}">
    <a class="nav-link " href="${pageContext.servletContext.contextPath}/login/logout/">
      <span class=" ">Đăng xuất</span>
    </a>
  </c:if>
 