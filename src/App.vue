<template>
<div id="app">
  <nav class="navbar navbar-expand bg-primary navbar-dark p-2">
    <img src="./components/icons/logooerp.jpg" alt="Логотип" style="width:40px;" class="rounded-pill"> <span class="oerplogo"> ОЭРП</span>
    <ul class="navbar-nav">
      <li class="nav-item">
        <RouterLink to="/employees" class="nav-link">Cотрудники</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/cars" class="nav-link">Автомобили</RouterLink>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">Добавить</a>
        <ul class="dropdown-menu">
          <li>
            <RouterLink to="/addEmployee" class="dropdown-item">Сотрудник</RouterLink>
          </li>
          <li>
            <RouterLink to="/addCar" class="dropdown-item">Автомобиль</RouterLink>
          </li>
        </ul>
      </li>

    </ul>
  </nav>

  <div class="container mt-3">
    <RouterView />
  </div>
</div>
</template>

<script>
export default{
  name:"app"
}
</script>

<style>
.oerplogo{
  margin-left:5px;
  margin-right:10px
}
</style>