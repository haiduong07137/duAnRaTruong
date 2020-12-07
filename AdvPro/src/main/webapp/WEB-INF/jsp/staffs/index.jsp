<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!doctype html>
<html lang="en">

<head>
	<title>Title</title>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<%-- 	<base href="${pageContext.servletContext.contextPath}" /> --%>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
		integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>

	<div class="container" style="max-width:600px;margin:10px ;">
		<form:form action="insert" modelAttribute="staff" class="form-horizontal" method="POST">
			<div class="form-row">
				<div class="form-group  col-md-3">
					<label for="">Mã Nhân viên</label>
					<form:input path="staff_id" class="form-control " placeholder="" />
				</div>

				<div class="form-group  col-md-4">
					<label for="">Tên nhân viên</label>
					<form:input path="name" class="form-control " aria-describedby="helpId" placeholder="" />
				</div>
				
			</div>


			<div class="btn-group  " data-toggle="buttons">
				<label class="btn btn-primary active">
					<input type="radio" value="0" name="gender" id="gender" checked>Nam
				</label>
				<label class="btn btn-primary">
					<input type="radio" value="1" name="gender" id="gender">Nữ
				</label>
			</div>


			<div class="form-row">
				<div class="form-group  col-md-3">
					<label for="">Ngày sinh</label>
					<form:input path="birthday" class="form-control" aria-describedby="helpId" placeholder="" />
				</div>
				<div class="form-group  col-md-4">
					<label for="">Ảnh</label>
					<form:input path="photo" class="form-control" aria-describedby="helpId" placeholder="" />
				</div>
				<div class="form-group  col-md-4">
					<label for="">Email</label>
					<form:input path="email" class="form-control" aria-describedby="helpId" placeholder="" />
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-md-3">
					<label for="">Số điện thoại</label>
					<form:input path="phone" class="form-control" aria-describedby="helpId" placeholder="" />
				</div>
				<div class="form-group col-md-4">
					<label for="">Lương</label>
					<form:input path="salary" class="form-control" aria-describedby="helpId" placeholder="" />
				</div>
				<div class="form-group col-md-3">
					<label for="">Ghi chú</label>
					<form:input path="notes" class="form-control" aria-describedby="helpId" placeholder="" />
				</div>
			</div>
			<div class="form-group col-md-4">
				<label for="">Phòng ban</label>
				<select class="custom-select" name="departs">
					<c:forEach var="u" items="${departs}">
						<option value="${u.depart_id}">${u.name}</option>
					</c:forEach>
				</select>
			</div>

			<button value="insert" name="insert" class="btn btn-primary">Thêm/Sửa</button>


		</form:form>
	</div>



	${message}



	<table class="table table-striped table-inverse table-responsive">
		<thead class="thead-inverse">
			<tr>
				<th>Mã nhân viên</th>
				<th>Tên nhân viên</th>
				<th>Giới tính</th>
				<th>Ngày sinh</th>
				<th>Ảnh</th>
				<th>Email</th>
				<th>Số điện thoại</th>
				<th>Lương</th>
				<th>Ghi chú</th>
				<th>Phòng ban</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="s" items="${staffs}">
				<tr>
					<td>${s.staff_id}</td>
					<td>${s.name}</td>
					<td>${s.gender}</td>
					<td>${s.birthday}</td>
					<td>${s.photo}</td>
					<td>${s.email}</td>
					<td>${s.phone}</td>
					<td>${s.salary}</td>
					<td>${s.notes}</td>
					<td>${s.depart_id.name}</td>
					<td><a class="badge badge-primary" href="delete/${s.staff_id}">Xóa</a></td>
					<td><a class="badge badge-primary" href="?id=${s.staff_id}&edit=edit">Sửa</a></td>
				</tr>
			</c:forEach>
		</tbody>
	</table>





	<!-- Optional JavaScript -->
	<!-- jQuery first, then Popper.js, then Bootstrap JS -->
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
		integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
		crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
		integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
		crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
		integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
		crossorigin="anonymous"></script>
</body>

</html>