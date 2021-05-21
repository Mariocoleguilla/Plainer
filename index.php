<?php
session_start();
if (!isset($_SESSION['year'])) {
    $_SESSION['year'] = getdate()['year'];
}
if (!isset($_SESSION['month'])) {
    $_SESSION['month'] = getdate()['mon'];
}
if (!isset($_SESSION['admin'])) {
    $_SESSION['admin'] = "false";
}
//Solo es true la primera vez que se entra a la web
if (!isset($_SESSION['firstEntry'])) {
    $_SESSION['firstEntry'] = "true";
} else {
    $_SESSION['firstEntry'] = "false";
}
if (!isset($_SESSION['view'])) {
    $_SESSION['view'] = "year";
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <?php require_once("./src/elements/head.html") ?>
    <title>Plainer</title>
</head>

<body>
    <header>
        <div class="progress">
            <div class="indeterminate"></div>
        </div>
        <!-- Select de vistas -->
        <div class="input-field fixed" id="viewSelectContainer">
            <select id="viewSelect">
                <option value="year">Año</option>
                <option value="month">Mes</option>
                <option value="events">Eventos</option>
            </select>
            <label>Seleccionar vista</label>
        </div>
        <!-- Blockquote -->
        <blockquote>
            <span id="yearBlockquote"></span>
            <span id="monthBlockquote"></span>
            <span id="eventsBlockquote"></span>
            <div class="switch">
                <span id="blockYearSpan">Bloquear año</span>
                <br/>
                <label>
                    Off
                    <input type="checkbox" checked="checked">
                    <span class="lever"></span>
                    On
                </label>
            </div>
        </blockquote>
        <!-- Feature discovery de Info -->
        <div id="infoFeatureDiscoveryContainer">
            <a id="info" class="waves-effect waves-light btn btn-floating red tooltipped" data-position="right" data-tooltip="Controles básicos">
                <i class="material-icons">info</i>
            </a>
        </div>
        <div id="infoFeatureDiscovery" class="tap-target red" data-target="info">
            <div class="tap-target-content white-text">
            </div>
        </div>
        <!-- Botón iniciar sesión -->
        <div id="loginWindowButtonContainer">
            <a id="loginWindowButton" class="waves-effect waves-light btn btn-floating red tooltipped" data-position="right" data-tooltip="">
                <i class="material-icons">assignment_ind</i>
            </a>
        </div>
        <!-- Header Año -->
        <div id="year" class="dateHeaders">
            <a class="btn-floating btn-small waves-effect waves-light grey next-prev-buttons tooltipped" data-position="left" data-tooltip="Retroceder año" id="prevButton">
                <i class="material-icons">chevron_left</i>
            </a>
            <span id="yearNumber" class="tooltipped" data-position="bottom" data-tooltip="Cambiar año"></span>
            <a class="btn-floating btn-small waves-effect waves-light grey next-prev-buttons tooltipped" data-position="right" data-tooltip="Avanzar año" id="nextButton">
                <i class="material-icons">chevron_right</i>
            </a>
            <div class="input-field" id="yearChangeInputContainer">
                <input type="number" id="yearChangeInput" />
                <label for="icon_prefix">Cambiar año</label>
                <a class="btn-floating btn-large waves-effect waves-light teal" id="yearChangeBackButton">
                    <i class="material-icons">arrow_back</i>
                </a>
                <a class="btn-floating btn-large waves-effect waves-light teal" id="yearChangeButton">
                    <i class="material-icons">check</i>
                </a>
            </div>
        </div>
        <!-- Header Mes -->
        <div id="month" class="dateHeaders">
            <a class="btn-floating btn-small waves-effect waves-light grey next-prev-buttons tooltipped" data-position="left" data-tooltip="Retroceder mes" id="prevMonthButton">
                <i class="material-icons">chevron_left</i>
            </a>
            <span id="monthName" class="tooltipped dropdown-trigger" data-target='monthDropdown' data-position="bottom" data-tooltip="Cambiar Mes"></span>
            <a class="btn-floating btn-small waves-effect waves-light grey next-prev-buttons tooltipped" data-position="right" data-tooltip="Avanzar mes" id="nextMonthButton">
                <i class="material-icons">chevron_right</i>
            </a>
        </div>
        <!-- Header Vista de eventos -->
        <div id="eventsView">
            <h2>Búsqueda de eventos</h2>
            <div id="eventsViewFlexContainer">
                <div id="fromContainer" class="datepickerContainers">
                    <div class="input-field">
                        <input type="text" id="fromDateInput" class="datepicker">
                        <label for="fromDateInput">Fecha desde</label>
                    </div>
                </div>
                <div id="toContainer" class="datepickerContainers">
                    <div class="input-field">
                        <input type="text" id="toDateInput" class="datepicker">
                        <label for="toDateInput">Fecha hasta</label>
                    </div>
                </div>
            </div>
            <div>
                <a class="waves-effect waves-light btn blue" id="findEventsButton"><i class="material-icons right">find_in_page</i>Buscar</a>
            </div>
            <div id="eventsViewAdvicesContainer">
                <span id="eventsViewAdvices" class="pulse"></span>
            </div>
        </div>
        <!-- Dropdown de Mes -->
        <ul id='monthDropdown' class='dropdown-content'>
            <li>
                <a id="monthDropdown1">Enero</a>
            </li>
            <li>
                <a id="monthDropdown2">Febrero</a>
            </li>
            <li>
                <a id="monthDropdown3">Marzo</a>
            </li>
            <li>
                <a id="monthDropdown4">Abril</a>
            </li>
            <li>
                <a id="monthDropdown5">Mayo</a>
            </li>
            <li>
                <a id="monthDropdown6">Junio</a>
            </li>
            <li>
                <a id="monthDropdown7">Julio</a>
            </li>
            <li>
                <a id="monthDropdown8">Agosto</a>
            </li>
            <li>
                <a id="monthDropdown9">Septiembre</a>
            </li>
            <li>
                <a id="monthDropdown10">Octubre</a>
            </li>
            <li>
                <a id="monthDropdown11">Noviembre</a>
            </li>
            <li>
                <a id="monthDropdown12">Diciembre</a>
            </li>
        </ul>
    </header>
    <main>
        <div class="flex-container main-calendar">
        </div>
    </main>
    <footer>
        <!-- Modal de semanas -->
        <div id="bottomModal" class="modal bottom-sheet">
            <div class="modal-content">
                <div class="empty"></div>
                <h4>Semana</h4>
                <div class="preloader-wrapper big active" id="roundedPreloader2">
                    <div class="spinner-layer spinner-blue">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="gap-patch">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>

                    <div class="spinner-layer spinner-red">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="gap-patch">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>

                    <div class="spinner-layer spinner-yellow">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="gap-patch">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>

                    <div class="spinner-layer spinner-green">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="gap-patch">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
                <div class="week-container container">
                    <div class="row"></div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-light btn-flat teal white-text">Cerrar</a>
            </div>
        </div>
        <!-- Modal de dias -->
        <div id="daysModal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4>Día</h4>
                <div id="hoursContainer">
                    <div class="row" id="hour1">
                        <div class="col m1 valign-wrapper">1:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour2">
                        <div class="col m1 valign-wrapper">2:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour3">
                        <div class="col m1 valign-wrapper">3:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour4">
                        <div class="col m1 valign-wrapper">4:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour5">
                        <div class="col m1 valign-wrapper">5:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour6">
                        <div class="col m1 valign-wrapper">6:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour7">
                        <div class="col m1 valign-wrapper">7:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour8">
                        <div class="col m1 valign-wrapper">8:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour9">
                        <div class="col m1 valign-wrapper">9:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour10">
                        <div class="col m1 valign-wrapper">10:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour11">
                        <div class="col m1 valign-wrapper">11:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour12">
                        <div class="col m1 valign-wrapper">12:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour13">
                        <div class="col m1 valign-wrapper">13:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour14">
                        <div class="col m1 valign-wrapper">14:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour15">
                        <div class="col m1 valign-wrapper">15:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour16">
                        <div class="col m1 valign-wrapper">16:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour17">
                        <div class="col m1 valign-wrapper">17:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour18">
                        <div class="col m1 valign-wrapper">18:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour19">
                        <div class="col m1 valign-wrapper">19:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour20">
                        <div class="col m1 valign-wrapper">20:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour21">
                        <div class="col m1 valign-wrapper">21:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour22">
                        <div class="col m1 valign-wrapper">22:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour23">
                        <div class="col m1 valign-wrapper">23:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                    <div class="row" id="hour24">
                        <div class="col m1 valign-wrapper">24:00h</div>
                        <div class="col m11 valign-wrapper"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-light btn-flat teal white-text">Cerrar</a>
            </div>
        </div>
        <!-- Modal de dias 2 (Tarjeta) -->
        <div id="daysModal2" class="modal modal-fixed-footer">
            <div class="modal-content">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">
                            <span class="activator" id="card-title1"></span>
                            <i class="material-icons right">more_vert</i>
                        </span>
                        <div id="eventsContainer"></div>
                        <a class="btn-floating btn-large waves-effect waves-light pulse adminElements" id="addEventButton">
                            <i class="material-icons">add</i>
                        </a>
                        <!-- Rueda de carga -->
                        <div class="preloader-wrapper big active" id="roundedPreloader">
                            <div class="spinner-layer spinner-blue">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div>
                                <div class="gap-patch">
                                    <div class="circle"></div>
                                </div>
                                <div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                            </div>

                            <div class="spinner-layer spinner-red">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div>
                                <div class="gap-patch">
                                    <div class="circle"></div>
                                </div>
                                <div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                            </div>

                            <div class="spinner-layer spinner-yellow">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div>
                                <div class="gap-patch">
                                    <div class="circle"></div>
                                </div>
                                <div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                            </div>

                            <div class="spinner-layer spinner-green">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div>
                                <div class="gap-patch">
                                    <div class="circle"></div>
                                </div>
                                <div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-reveal teal">
                        <span class="card-title white-text text-darken-4">
                            <span class="activator" id="card-title2"></span>
                            <i class="material-icons right" id="closeCardReveal">close</i>
                        </span>
                        <a class="waves-effect waves-light btn-large orange darken-4" id="viewFullDayButton">
                            <i class="material-icons left">fullscreen</i>Ver día completo</a>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-light btn-flat teal white-text">Cerrar</a>
            </div>
        </div>
        <!-- Gran Modal inicial -->
        <div id="initModal" class="modal">
            <div class="modal-content">
                <h1 class="white-text">Plainer</h1>
                <div>
                    <div>
                        <a class="modal-action modal-close btn-large btn-floating waves-effect waves-light red pulse" id="initModalClose">
                            <i class="large material-icons">arrow_forward</i>
                        </a>
                    </div>
                    <div id="loginContainer">
                        <div class="input-field">
                            <i class="material-icons prefix">account_circle</i>
                            <input id="userInput" type="text">
                            <label for="userInput">Usuario</label>
                        </div>
                        <div class="input-field">
                            <i class="material-icons prefix">blur_on</i>
                            <input id="passwordInput" type="password">
                            <label for="passwordInput">Contraseña</label>
                        </div>
                        <a class="waves-effect waves-light btn-flat red white-text" id="loginButton">
                            <span>Acceso de administrador</span>
                            <div class="preloader-wrapper small active buttonLoader">
                                <div class="spinner-layer spinner-blue-only">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div><div class="gap-patch">
                                    <div class="circle"></div>
                                </div><div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div id="logoutButtonContainer">
                    <a class="waves-effect waves-light btn-flat red white-text" id="logoutButton">
                        <span>Cerrar sesión</span>
                        <div class="preloader-wrapper small active buttonLoader">
                            <div class="spinner-layer spinner-blue-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <!-- Modal de añadir eventos -->
        <div id="addEventModal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4>Añadir evento</h4>
                <span id="daySpecified"></span>
                <div>
                    <div class="input-field">
                        <i class="material-icons prefix">text_fields</i>
                        <input id="eventNameInput" type="text">
                        <label for="eventNameInput">Nombre del evento</label>
                    </div>
                    <div id="rangeContainer">
                        <p>Seleccionar rango de horas</p>
                        <div id="test-slider"></div>
                        <div class="hoursSlider">
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                            <div>4</div>
                            <div>5</div>
                            <div>6</div>
                            <div>7</div>
                            <div>8</div>
                            <div>9</div>
                            <div>10</div>
                            <div>11</div>
                            <div>12</div>
                            <div>13</div>
                            <div>14</div>
                            <div>15</div>
                            <div>16</div>
                            <div>17</div>
                            <div>18</div>
                            <div>19</div>
                            <div>20</div>
                            <div>21</div>
                            <div>22</div>
                            <div>23</div>
                            <div>24</div>
                        </div>
                    </div>
                    <div class="input-field colorSelectsContainers" id="colorSelectContainer">
                        <select id="colorSelect">
                            <option value="disabled" disabled selected>Elige un color</option>
                            <option value="red">Rojo</option>
                            <option value="pink">Rosa</option>
                            <option value="purple">Morado</option>
                            <option value="blue">Azul</option>
                            <option value="lime">Lima</option>
                            <option value="green">Verde</option>
                            <option value="yellow">Amarillo</option>
                            <option value="orange">Naranja</option>
                            <option value="brown">Marrón</option>
                            <option value="grey">Gris</option>
                        </select>
                        <label>Selecciona un color</label>
                    </div>
                    <input type="hidden" id="hiddenDateInput">
                    <div>
                        <a class="waves-effect waves-light btn red" id="addEventFinalButton"><i class="material-icons left">add</i>Añadir evento</a>
                    </div>
                    <div id="addEventAdvicesContainer">
                        <span id="addEventAdvices" class="pulse"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-light btn-flat teal white-text">Cerrar</a>
            </div>
        </div>
        <!-- Modal de editar eventos -->
        <div id="editEventModal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4>Editar evento</h4>
                <span id="editDaySpecified"></span>
                <div>
                    <div class="input-field">
                        <i class="material-icons prefix">text_fields</i>
                        <input id="editEventNameInput" type="text">
                        <label for="editEventNameInput">Nombre del evento</label>
                    </div>
                    <div id="rangeContainer">
                        <p>Editar rango de horas</p>
                        <div id="editTest-slider"></div>
                        <div class="hoursSlider">
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                            <div>4</div>
                            <div>5</div>
                            <div>6</div>
                            <div>7</div>
                            <div>8</div>
                            <div>9</div>
                            <div>10</div>
                            <div>11</div>
                            <div>12</div>
                            <div>13</div>
                            <div>14</div>
                            <div>15</div>
                            <div>16</div>
                            <div>17</div>
                            <div>18</div>
                            <div>19</div>
                            <div>20</div>
                            <div>21</div>
                            <div>22</div>
                            <div>23</div>
                            <div>24</div>
                        </div>
                    </div>
                    <div class="input-field colorSelectsContainers" id="editColorSelectContainer">
                        <select id="editColorSelect">
                            <option value="disabled" disabled selected>Elige un color</option>
                            <option value="red">Rojo</option>
                            <option value="pink">Rosa</option>
                            <option value="purple">Morado</option>
                            <option value="blue">Azul</option>
                            <option value="lime">Lima</option>
                            <option value="green">Verde</option>
                            <option value="yellow">Amarillo</option>
                            <option value="orange">Naranja</option>
                            <option value="brown">Marrón</option>
                            <option value="grey">Gris</option>
                        </select>
                        <label>Selecciona un color</label>
                        <a class="waves-effect waves-light btn red" id="editEventFinalButton"><i class="material-icons left">edit</i>Editar evento</a>
                    </div>
                    <input type="hidden" id="idInputEditHidden"/>
                    <input type="hidden" id="dateInputEditHidden"/>
                    <div id="editEventAdvicesContainer">
                        <span id="editEventAdvices" class="pulse"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-light btn-flat teal white-text">Cerrar</a>
            </div>
        </div>
        <!-- Feature discovery de ascender página -->
        <div class="fixed-action-btn" id="bottomButtonContainer">
            <a id="bottomButton" class="btn btn-floating btn-large teal tap-target-origin tooltipped waves-effect waves-light" data-position="left"
                data-tooltip="Subir página">
                <i class="material-icons">arrow_upward</i>
            </a>
        </div>
        <div id="topFeatureDiscovery" class="tap-target teal" data-target="bottomButton">
            <div class="tap-target-content white-text">
                <h5>Asciende al tope de la página</h5>
                <p>Pulsar el botón para subir en la página, doble click para volver a mostrar este aviso</p>
            </div>
            <div class="tap-target-wave">
                <a id="bottomButton2" class="btn btn-floating btn-large teal tap-target-origin waves-effect waves-light tooltipped" data-position="left"
                    data-tooltip="Subir página">
                    <i class="material-icons">arrow_upward</i>
                </a>
            </div>
        </div>
        <!-- Botón de retorno al año actual -->
        <div class="fixed-action-btn direction-top active" id="resetYearButton">
            <a class="btn btn-floating btn-large teal waves-effect waves-light tooltipped" data-position="left" data-tooltip="" id="resetButton">
                <i class="material-icons">date_range</i>
            </a>
        </div>
    </footer>
    <?php require_once("./src/elements/scripts.html") ?>
    <script type="text/javascript">
        var year;
        var admin;
        var firstEntry;
        var check = true;
        var fullWeekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        $(function () {
            $.get("./src/funcs/funcs.php?firstEntryRequest", function () {}).done(function (data) {
                firstEntry = data;
                //Inicializaciones de los componentes javascript de Materialize y el slider de noUiSlider materializado
                M.AutoInit();
                $("#fromDateInput").datepicker({
                    format: "dd-mm-yyyy",
                    firstDay: 1,
                    showDaysInNextAndPreviousMonths: true
                });
                $("#toDateInput").datepicker({
                    format: "dd-mm-yyyy",
                    firstDay: 1,
                    showDaysInNextAndPreviousMonths: true
                });
                var slider = $("#test-slider")[0];
                noUiSlider.create(slider, {
                    start: [1, 24],
                    connect: true,
                    step: 1,
                    orientation: 'horizontal', // 'horizontal' o 'vertical'
                    range: {
                        'min': 1,
                        'max': 24
                    },
                    format: wNumb({
                        decimals: 2
                    })
                });
                var slider2 = $("#editTest-slider")[0];
                noUiSlider.create(slider2, {
                    start: [1, 24],
                    connect: true,
                    step: 1,
                    orientation: 'horizontal', // 'horizontal' o 'vertical'
                    range: {
                        'min': 1,
                        'max': 24
                    },
                    format: wNumb({
                        decimals: 2
                    })
                });
                //Se comprueba la existencia de la base de datos, y se crea si no existe
                checkBBDD();
                $.get("./src/funcs/funcs.php?adminRequest", function () {}).done(function (data) {
                admin = data;
                    if (admin == "true") {
                        loginDisable();
                    } else {
                        loginEnable();
                    }
                    if (firstEntry == "true") {
                        $("#initModal").modal("open");
                        yearView();
                    } else {
                        $.get("./src/funcs/funcs.php?viewRequest", function () {}).done(function (data) {
                            switch (data) {
                                case "year":
                                    yearView();
                                    $("#viewSelect").val("year");
                                    $("#viewSelect").formSelect();
                                    break;
                                case "month":
                                    monthView();
                                    $("#viewSelect").val("month");
                                    $("#viewSelect").formSelect();
                                    break;
                                case "events":
                                    eventsView();
                                    $("#viewSelect").val("events");
                                    $("#viewSelect").formSelect();
                                    break;
                            }
                        });
                    }

                    $(document).one("scroll", function (event) {
                        if (firstEntry == "true") {
                            $("#topFeatureDiscovery").tapTarget("open");
                            setTimeout(function () {
                                $("#topFeatureDiscovery").tapTarget("close")
                            }, 3000);
                        }
                    });

                    $("#bottomButton, #bottomButton2").click(function (event) {
                        window.scroll({
                            top: -99999999,
                            left: 0,
                            behavior: 'smooth'
                        });
                    });
                    $("#bottomButton, #bottomButton2").dblclick(function (event) {
                        $("#topFeatureDiscovery").tapTarget("open");
                    });

                    $("#info").click(function (event) {
                        $("#infoFeatureDiscovery").tapTarget("open");
                    });

                    //Onchange del select de vistas
                    $("#viewSelect").change(function (event) {
                        $.get("./src/funcs/funcs.php?viewChange=" + $(this).find("option:selected").val(), function () {}).done(function (data) {
                            switch ($("#viewSelect option:selected").val()) {
                                case "year":
                                    $("#month").fadeOut(200);
                                    $("#eventsView").fadeOut(200);
                                    $(".flex-container.main-calendar").fadeOut(200);
                                    setTimeout(function () {
                                        yearView();
                                        $(".flex-container.main-calendar").fadeIn(200)
                                    }, 200);
                                    break;
                                case "month":
                                    $("#year").fadeOut(200);
                                    $("#eventsView").fadeOut(200);
                                    $(".flex-container.main-calendar").fadeOut(200);
                                    setTimeout(function () {
                                        monthView();
                                        $(".flex-container.main-calendar").fadeIn(200)
                                    }, 200);
                                    break;
                                case "events":
                                    $("#month").fadeOut(200);
                                    $(".flex-container.main-calendar").fadeOut(200);
                                    setTimeout(function () {
                                        eventsView();
                                        $(".flex-container.main-calendar").fadeIn(200)
                                    }, 200);
                                    break;
                            }
                        });
                    });

                    $("#bottomModal").find(".modal-footer").find("a").click(function () {
                        $('#bottomModal').modal('close');
                    });
                    $("#daysModal").find(".modal-footer").find("a").click(function () {
                        $('#daysModal').modal('close');
                    });
                    $("#daysModal2").find(".modal-footer").find("a").click(function () {
                        $('#daysModal2').modal('close');
                    });
                    
                    $("#viewFullDayButton").click(function (event) {
                        var fullWeekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
                        //El siguiente each se introduce debido a que si se modifica un evento, y se le añaden horas después de haber
                        //visualizado las horas, y se vuelven a mirar las horas, se quedan los eventos antes mostrados y la clase de hourQueriedEmpty en los divs de los eventos.
                        $("#hoursContainer").find(".m11").each(function (index, value) {
                            $(this).html("");
                            $(this).removeClass("hourQueriedEmpty");
                        });
                        if ($(this).parent().attr("id") != undefined) {
                            $("#daysModal2").modal("close");
                            var prev = $(this);
                            $.get("./src/funcs/funcs.php?queryDay=" + prev.parent().attr("id").substr(8, prev.attr("id").length), function () {}).done(function (data) {
                                if (data != "[]") {
                                    var hours, event, color;
                                    for (var i = 0; i < JSON.parse(data).length; i++) {
                                        hours = JSON.parse(JSON.parse(data)[i].hours.replace(/'/g, '"'));
                                        event = JSON.parse(data)[i].event;
                                        color = JSON.parse(data)[i].color;
                                        $.each(hours, function (index, value) {
                                            if (value == "true") {
                                                if ($("#hour" + index).find(".m11").text() == "Sin eventos") {
                                                    $("#hour" + index).find(".m11").html("");
                                                    $("#hour" + index).find(".m11").removeClass("hourQueriedEmpty");
                                                }
                                                    $("#hour" + index).find(".m11").append("<div class='valign-wrapper " + color + "'><p>" + event + "</p></div>");
                                            } else {
                                                if ($("#hour" + index).find(".m11").html().indexOf("div") == -1) {
                                                    $("#hour" + index).find(".m11").text("Sin eventos");
                                                    $("#hour" + index).find(".m11").addClass("hourQueriedEmpty");
                                                }
                                            }
                                        });
                                    }
                                } else {
                                    $("#hoursContainer").find(".col.m11.valign-wrapper").addClass("hourQueriedEmpty");
                                    $("#hoursContainer").find(".col.m11.valign-wrapper").text("Sin eventos");
                                }
                                var thisDate = moment(parseInt(prev.parent().attr("id").substr(8, prev.attr("id").length)))
                                $("#daysModal").find(".modal-content").find("h4").text(fullWeekDays[thisDate.weekday()] + " " + thisDate.format("D") + " de " + thisDate.format("MMMM") + " del " + thisDate.year());
                                setTimeout(function() {$("#daysModal").modal("open");}, 400);
                            });
                        }
                    });

                    $("#initModalClose").click(function () {
                        if (firstEntry == "true" && check) {
                            $("#infoFeatureDiscovery").tapTarget("open");
                            setTimeout(function () {
                                $("#infoFeatureDiscovery").tapTarget("close");
                            }, 3000);
                            check = false;
                        }
                    });

                    $("#loginWindowButton").click(function () {
                        $("#initModal").modal("open");
                    });
                    $("#loginButton").off();
                    $("#loginButton").click(function () {
                        $("#loginButton").find("span").hide();
                        $("#loginButton").find(".buttonLoader").show();
                        $.get("./src/funcs/funcs.php?queryUser=" + JSON.stringify({
                                user: $("#userInput").val(),
                                password: $("#passwordInput").val()
                            }), function () {}).done(function (data) {
                            if (data == "1") {
                                $.get("./src/funcs/funcs.php?adminLogged", function () {}).done(function (data) {
                                    $("#loginContainer").css("background-color", "rgb(0, 200, 0)");
                                    setTimeout(function () {
                                        $("#initModal").modal("close");
                                    }, 300);
                                    loginDisable();
                                    $.get("./src/funcs/funcs.php?viewRequest", function () {}).done(function (data) {
                                        switch (data) {
                                            case "year":
                                                yearView();
                                                break;
                                            case "month":
                                                monthView();
                                                break;
                                            case "events":
                                                eventsView();
                                                break;
                                        }
                                    });
                                });
                            } else {
                                $("#loginContainer").css("background-color", "red");
                                $("#loginButton").css("background-color", "black");
                                setTimeout(function () {
                                    $("#loginContainer").css("background-color", "white");
                                    setTimeout(function () {
                                        $("#loginContainer").css("background-color", "red");
                                        setTimeout(function () {
                                            $("#loginContainer").css("background-color", "white");
                                        },200);
                                    }, 200);
                                }, 200);
                            }
                            if (firstEntry == "true" && check) {
                                $("#infoFeatureDiscovery").tapTarget("open");
                                setTimeout(function () {
                                    $("#infoFeatureDiscovery").tapTarget("close");
                                }, 3000);
                                check = false;
                            }
                            $("#loginButton").find("span").show();
                            $("#loginButton").find(".buttonLoader").hide();
                        });
                    });
                    $("#logoutButton").off();
                    $("#logoutButton").click(function () {
                        $("#logoutButton").find("span").hide();
                        $("#logoutButton").find(".buttonLoader").show();
                        $.get("./src/funcs/funcs.php?logout", function () {}).done(function (data) {
                            loginEnable();
                            $.get("./src/funcs/funcs.php?viewRequest", function () {}).done(function (data) {
                                switch (data) {
                                    case "year":
                                        yearView();
                                        break;
                                    case "month":
                                        monthView();
                                        break;
                                    case "events":
                                        eventsView();
                                        break;
                                }
                            });
                            $("#logoutButton").find("span").show();
                            $("#logoutButton").find(".buttonLoader").hide();
                        });
                    });
                    $("#userInput").on('keydown', function (event) {
                        if (event.which == 13 || event.keyCode == 13) {
                            $("#loginButton").trigger("click");
                        }
                    });
                    $("#passwordInput").on('keydown', function (event) {
                        if (event.which == 13 || event.keyCode == 13) {
                            $("#loginButton").trigger("click");
                        }
                    });
                    $("#addEventButton").click(function () {
                        $("#daysModal2").modal("close");
                        $("#eventNameInput").val("");
                        $("#test-slider")[0].noUiSlider.set(["1.00", "24.00"]);
                        $("#colorSelect").val("disabled");
                        $("#colorSelect").formSelect();
                        $("#addEventAdvices").css("padding", "0px");
                        $("#addEventAdvices").text("");
                        $("#daySpecified").text("Se va a añadir un evento para el " + $(this).parent().find("#card-title1").text());
                        $("#hiddenDateInput").val($(this).parent().parent().find(".card-reveal").attr("id").substr(8, $(this).parent().parent().find(".card-reveal").attr("id").length));
                        $("#colorSelectContainer").find("li").each(function (index, value) {
                            $(this).find("span").addClass($("#colorSelect").find("option").eq(index).val() + " white-text");
                        });
                        setTimeout(function() {$("#addEventModal").modal("open");}, 400);
                    });
                    $("#addEventFinalButton").off();
                    $("#addEventFinalButton").click(function() {
                        var advices = "";
                        if ($("#eventNameInput").val() == "") {
                            advices += "Introduce un nombre de evento";
                        }
                        if ($("#colorSelect").val() == null) {
                            if (advices == "") {
                                advices += "Selecciona un color";
                            } else {
                                advices += " y selecciona un color";
                            }
                        }

                        if (advices == "") {
                            var obj = {
                                1: "false",
                                2: "false",
                                3: "false",
                                4: "false",
                                5: "false",
                                6: "false",
                                7: "false",
                                8: "false",
                                9: "false",
                                10: "false",
                                11: "false",
                                12: "false",
                                13: "false",
                                14: "false",
                                15: "false",
                                16: "false",
                                17: "false",
                                18: "false",
                                19: "false",
                                20: "false",
                                21: "false",
                                22: "false",
                                23: "false",
                                24: "false",
                            }
                            var firstValue = parseInt($("#test-slider")[0].noUiSlider.get()[0].substr(0, $("#test-slider")[0].noUiSlider.get()[0].length - 2));
                            var secondValue = parseInt($("#test-slider")[0].noUiSlider.get()[1].substr(0, $("#test-slider")[0].noUiSlider.get()[0].length - 2));
                            for (var i = firstValue; i <= secondValue; i++) {
                                obj[i] = "true";
                            }
                            var insert = JSON.stringify({
                                date: $("#hiddenDateInput").val(),
                                event: $("#eventNameInput").val(),
                                hours: JSON.stringify(obj),
                                color: $("#colorSelect").val()
                            });
                            $.get("./src/funcs/funcs.php?insertEvent=" + insert, function () {}).done(function (data) {
                                $("#addEventModal").modal("close");
                                $("#daysModal2").modal("close");
                                $.get("./src/funcs/funcs.php?viewRequest", function () {}).done(function (data) {
                                    switch (data) {
                                        case "year":
                                            yearView();
                                            break;
                                        case "month":
                                            monthView();
                                            break;
                                        case "events":
                                            eventsView();
                                            break;
                                    }
                                });
                            });
                        } else {
                            $("#addEventAdvices").css("padding", "10px");
                            $("#addEventAdvices").text(advices);
                        }
                    });
                    $("#findEventsButton").off();
                    $("#findEventsButton").click(function (event) {
                        $(".progress").fadeIn();
                        var retreivedEvents;
                        var savedYear;
                        var savedDate;
                        var extractedHours = new Array();
                        var fullWeekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
                        $(".flex-container.main-calendar").html("<div class='yearEventsContainer'></div>");
                        if ($("#fromDateInput").val() == "" || $("#toDateInput").val() == "") {
                            if ($("#fromDateInput").val() == "" && $("#toDateInput").val() == "") {
                                $("#eventsViewAdvicesContainer").fadeIn();
                                $("#eventsViewAdvices").text("Rellena las fechas de inicio y fin");
                            } else if ($("#fromDateInput").val() == "" && $("#toDateInput").val() != "") {
                                $("#eventsViewAdvicesContainer").fadeIn();
                                $("#eventsViewAdvices").text("Rellena la fecha de inicio");
                            } else if ($("#fromDateInput").val() != "" && $("#toDateInput").val() == "") {
                                $("#eventsViewAdvicesContainer").fadeIn();
                                $("#eventsViewAdvices").text("Rellena la fecha de fin");
                            }
                        $(".progress").fadeOut();
                        } else {
                            if (moment($("#toDateInput").val(), "DD-MM-YYYY").valueOf() < moment($("#fromDateInput").val(), "DD-MM-YYYY").valueOf()) {
                                $("#eventsViewAdvicesContainer").fadeIn();
                                $("#eventsViewAdvices").text("La fecha de inicio no puede ser posterior a la fecha de fin");
                                $(".progress").fadeOut();
                            } else {
                                $("#eventsViewAdvicesContainer").fadeOut();
                                var dateFrom = moment($("#fromDateInput").val(), "DD-MM-YYYY").valueOf();
                                var dateTo = moment($("#toDateInput").val(), "DD-MM-YYYY").valueOf();
                                $.get("./src/funcs/funcs.php?eventsQuery=" + JSON.stringify({from: dateFrom, to: dateTo}), function () {}).done(function (data) {
                                    retreivedEvents = JSON.parse(data);
                                    $("#eventsBlockquote").html("Resultado de la búsqueda:<br/>" + retreivedEvents.length + " resultados");
                                    $.get("./src/funcs/funcs.php?adminRequest", function () {}).done(function (data) {
                                        if (retreivedEvents == "[]") {
                                            $(".yearEventsContainer").append("<div id='events-not-found'><span class='pulse'>No existen eventos para éste rango de fechas</span></div>").hide().fadeIn();
                                        } else {
                                            if (data == "true") {
                                                for (var i = 0; i < retreivedEvents.length; i++) {
                                                    extractedHours = new Array();
                                                    if (i == 0) {
                                                        savedYear = moment(parseInt(retreivedEvents[i].date)).year();
                                                        $(".yearEventsContainer").append("<div class='yearDivider'><hr/><span>" + savedYear + "</span><hr/></div>");
                                                    } else if (moment(parseInt(retreivedEvents[i].date)).year() != savedYear) {
                                                        savedYear = moment(parseInt(retreivedEvents[i].date)).year();
                                                        $(".yearEventsContainer").append("<div class='yearDivider'><hr/><span>" + savedYear + "</span><hr/></div>");
                                                    }
                                                    $.each(JSON.parse(retreivedEvents[i].hours), function(index, value) {
                                                        if (value == "true") {
                                                            extractedHours.push(index);
                                                        }
                                                    });
                                                    var date = moment(parseInt(retreivedEvents[i].date));
                                                    if (i == 0) {
                                                        savedDate = parseInt(retreivedEvents[i].date);
                                                        $(".yearEventsContainer").append("<div>" + fullWeekDays[date.weekday()] + " " + date.format("D") + " de " + date.format("MMMM") + " de " + date.year() + "</div>");
                                                    } else if(parseInt(retreivedEvents[i].date) != savedDate) {
                                                        $(".yearEventsContainer").append("<div>" + fullWeekDays[date.weekday()] + " " + date.format("D") + " de " + date.format("MMMM") + " de " + date.year() + "</div>");
                                                        savedDate = parseInt(retreivedEvents[i].date);
                                                    }
                                                    if (extractedHours[0] == "1" && extractedHours[extractedHours.length - 1] == "24") {
                                                        $(".yearEventsContainer").append("<div class='eventsViewEventAdmin " + retreivedEvents[i].color + "'><span><b>Título</b>: " + retreivedEvents[i].event + "</span><span class='remove-event-button-container'><a id='remove-event-" + retreivedEvents[i].id + "' class='btn-floating btn-small waves-effect waves-light red accent-4 tooltipped remove-event-button' data-position='left' data-tooltip='Eliminar evento'><i class='material-icons'>delete_forever</i></a><a id='edit-event-" + retreivedEvents[i].id + "' data-edit='" + JSON.stringify(retreivedEvents[i]) + "' class='btn-floating btn-small waves-effect waves-light cyan lighten-1 tooltipped edit-event-button' data-position='right' data-tooltip='Editar evento'><i class='material-icons'>edit</i></a></span><span><b>Duración</b>: Todo el día</span></div>").hide().fadeIn();
                                                    } else {
                                                        $(".yearEventsContainer").append("<div class='eventsViewEventAdmin " + retreivedEvents[i].color + "'><span><b>Título</b>: " + retreivedEvents[i].event + "</span><span class='remove-event-button-container'><a id='remove-event-" + retreivedEvents[i].id + "' class='btn-floating btn-small waves-effect waves-light red accent-4 tooltipped remove-event-button' data-position='left' data-tooltip='Eliminar evento'><i class='material-icons'>delete_forever</i></a><a id='edit-event-" + retreivedEvents[i].id + "' data-edit='" + JSON.stringify(retreivedEvents[i]) + "' class='btn-floating btn-small waves-effect waves-light cyan lighten-1 tooltipped edit-event-button' data-position='right' data-tooltip='Editar evento'><i class='material-icons'>edit</i></a></span><span><b>Duración</b>: " + extractedHours[0] + ":00h - " + extractedHours[extractedHours.length - 1] + ":00h</span></div>").hide().fadeIn();
                                                    }
                                                }
                                                $(".remove-event-button").off();
                                                $(".remove-event-button").click(function (event) {
                                                    $.get("./src/funcs/funcs.php?deleteEvent=" + $(this).attr("id").substr(13, $(this).attr("id").length), function () {}).done(function (data) {
                                                        M.toast({html: 'Evento eliminado'});
                                                        $.get("./src/funcs/funcs.php?viewRequest", function () {}).done(function (data) {
                                                            $("#daysModal2").modal("close");
                                                            switch (data) {
                                                                case "year":
                                                                    yearView();
                                                                    $("#viewSelect").val("year");
                                                                    $("#viewSelect").formSelect();
                                                                    break;
                                                                case "month":
                                                                    monthView();
                                                                    $("#viewSelect").val("month");
                                                                    $("#viewSelect").formSelect();
                                                                    break;
                                                                case "events":
                                                                    eventsView();
                                                                    $("#viewSelect").val("events");
                                                                    $("#viewSelect").formSelect();
                                                                    break;
                                                            }
                                                        });
                                                    });
                                                });
                                                $(".edit-event-button").click(function (event) {
                                                    $("#daysModal2").modal("close");
                                                    var hoursArray = new Array();
                                                    var thisDate = moment(parseInt(JSON.parse($(this).attr("data-edit")).date));
                                                    $.each(JSON.parse(JSON.parse($(this).attr("data-edit")).hours), function(index, value) {
                                                        if (value == "true") {
                                                            hoursArray.push(index + ".00");
                                                        }
                                                    });
                                                    $("#editEventNameInput").val(JSON.parse($(this).attr("data-edit")).event);
                                                    $("#editTest-slider")[0].noUiSlider.set([hoursArray[0], hoursArray[hoursArray.length - 1]]);
                                                    $("#editColorSelect").val(JSON.parse($(this).attr("data-edit")).color);
                                                    $("#editColorSelect").formSelect();
                                                    $("#editEventAdvices").css("padding", "0px");
                                                    $("#editEventAdvices").text("");
                                                    $("#editDaySpecified").text("Se va a editar un evento para el " + fullWeekDays[thisDate.weekday()] + " " + thisDate.format("D") + " de " + thisDate.format("MMMM") + " de " + thisDate.format("YYYY"));
                                                    $("#editColorSelectContainer").find("li").each(function (index, value) {
                                                            $(this).find("span").addClass($("#editColorSelect").find("option").eq(index).val() + " white-text");
                                                    });
                                                    $("#idInputEditHidden").val(JSON.parse($(this).attr("data-edit")).id);
                                                    $("#dateInputEditHidden").val(JSON.parse($(this).attr("data-edit")).date);
                                                    setTimeout(function() {$("#editEventModal").modal("open");}, 400);
                                                });
                                                $("#editEventFinalButton").off();
                                                $("#editEventFinalButton").click(function() {
                                                    var advices = "";
                                                    if ($("#editEventNameInput").val() == "") {
                                                        advices += "Introduce un nombre de evento";
                                                    }
                                                    if ($("#editColorSelect").val() == null) {
                                                        if (advices == "") {
                                                            advices += "Selecciona un color";
                                                        } else {
                                                            advices += " y selecciona un color";
                                                        }
                                                    }

                                                    if (advices == "") {
                                                        var obj = {
                                                            1: "false",
                                                            2: "false",
                                                            3: "false",
                                                            4: "false",
                                                            5: "false",
                                                            6: "false",
                                                            7: "false",
                                                            8: "false",
                                                            9: "false",
                                                            10: "false",
                                                            11: "false",
                                                            12: "false",
                                                            13: "false",
                                                            14: "false",
                                                            15: "false",
                                                            16: "false",
                                                            17: "false",
                                                            18: "false",
                                                            19: "false",
                                                            20: "false",
                                                            21: "false",
                                                            22: "false",
                                                            23: "false",
                                                            24: "false",
                                                        }
                                                        var firstValue = parseInt($("#editTest-slider")[0].noUiSlider.get()[0].substr(0, $("#editTest-slider")[0].noUiSlider.get()[0].length - 2));
                                                        var secondValue = parseInt($("#editTest-slider")[0].noUiSlider.get()[1].substr(0, $("#editTest-slider")[0].noUiSlider.get()[0].length - 2));
                                                        for (var i = firstValue; i <= secondValue; i++) {
                                                            obj[i] = "true";
                                                        }
                                                        var insert = JSON.stringify({
                                                            id: $("#idInputEditHidden").val(),
                                                            date: $("#dateInputEditHiddenn").val(),
                                                            event: $("#editEventNameInput").val(),
                                                            hours: JSON.stringify(obj),
                                                            color: $("#editColorSelect").val()
                                                        });
                                                        $.get("./src/funcs/funcs.php?editEvent=" + insert, function () {}).done(function (data) {
                                                            $("#editEventModal").modal("close");
                                                            $("#daysModal2").modal("close");
                                                            $.get("./src/funcs/funcs.php?viewRequest", function () {}).done(function (data) {
                                                                switch (data) {
                                                                    case "year":
                                                                        yearView();
                                                                        break;
                                                                    case "month":
                                                                        monthView();
                                                                        break;
                                                                    case "events":
                                                                        eventsView();
                                                                        $("#findEventsButton").trigger("click");
                                                                        break;
                                                                }
                                                                M.toast({html: 'Evento editado'});
                                                            });
                                                        });
                                                    } else {
                                                        $("#editEventAdvices").css("padding", "10px");
                                                        $("#editEventAdvices").text(advices);
                                                    }
                                                });
                                        } else {
                                            for (var i = 0; i < retreivedEvents.length; i++) {
                                                    extractedHours = new Array();
                                                    if (i == 0) {
                                                        savedYear = moment(parseInt(retreivedEvents[i].date)).year();
                                                        $(".yearEventsContainer").append("<div class='yearDivider'><hr/><span>" + savedYear + "</span><hr/></div>");
                                                    } else if (moment(parseInt(retreivedEvents[i].date)).year() != savedYear) {
                                                        savedYear = moment(parseInt(retreivedEvents[i].date)).year();
                                                        $(".yearEventsContainer").append("<div class='yearDivider'><hr/><span>" + savedYear + "</span><hr/></div>");
                                                    }
                                                    $.each(JSON.parse(retreivedEvents[i].hours), function(index, value) {
                                                        if (value == "true") {
                                                            extractedHours.push(index);
                                                        }
                                                    });
                                                    var date = moment(parseInt(retreivedEvents[i].date));
                                                    if (i == 0) {
                                                        savedDate = parseInt(retreivedEvents[i].date);
                                                        $(".yearEventsContainer").append("<div>" + fullWeekDays[date.weekday()] + " " + date.format("D") + " de " + date.format("MMMM") + " de " + date.year() + "</div>")
                                                    } else if(parseInt(retreivedEvents[i].date) != savedDate) {
                                                        $(".yearEventsContainer").append("<div>" + fullWeekDays[date.weekday()] + " " + date.format("D") + " de " + date.format("MMMM") + " de " + date.year() + "</div>")
                                                        savedDate = parseInt(retreivedEvents[i].date);
                                                    }
                                                    if (extractedHours[0] == "1" && extractedHours[extractedHours.length - 1] == "24") {
                                                        $(".yearEventsContainer").append("<div class='eventsViewEvent " + retreivedEvents[i].color + "'><span><b>Título</b>: " + retreivedEvents[i].event + "</span><span><b>Duración</b>: Todo el día</span></div>").hide().fadeIn();
                                                    } else {
                                                        $(".yearEventsContainer").append("<div class='eventsViewEvent " + retreivedEvents[i].color + "'><span><b>Título</b>: " + retreivedEvents[i].event + "</span><span><b>Duración</b>: " + extractedHours[0] + ":00h - " + extractedHours[extractedHours.length - 1] + ":00h</span></div>").hide().fadeIn();
                                                    }
                                                }
                                        }
                                        $(".remove-event-button").tooltip();
                                        $(".edit-event-button").tooltip();
                                        }
                                        $(".progress").fadeOut();
                                    });
                                });
                            }
                        }
                    });
                });
            });
        });
    </script>
</body>

</html>