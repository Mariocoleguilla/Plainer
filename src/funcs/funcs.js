/**********************Global variables**********************/
var footer =
    '<div class="page-footer red">' +
        '<div class="container">' +
            '<div class="row">' +
                '<div class="col l6 s12">' +
                    '<h5 class="white-text">Sobre el nombre</h5>' +
                    '<p id="aboutName" class="grey-text text-lighten-4">El nombre de "Plainer" aparece como combinación de la palabra Plain (de diseño simple y plano) y Planner (de planeador de eventos), al igual que la ' +
                    'propia palabra como tal (simple, escueto o evidente) que ayuda a reflejar el objetivo de la aplicación</p>' +
                '</div>' +
                '<div class="col l4 offset-l2 s12">' +
                    '<h5 class="white-text">Acerca de Plainer</h5>' +
                    '<p id="about">Plainer es una aplicación diseñada con el proyecto final del ciclo superior de Desarrollo de Aplicaciones Web como objetivo</p>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="footer-copyright">' +
            '<div class="container"> © 2018 Mario GF' +
            '</div>' +
        '</div>' +
    '</div>';
/**********************Global variables**********************/
/**********************Month Hover**********************/
function monthMouseOver(event) {
    if ($(event.target).hasClass("month")) {
        $(event.target).css("background-color", "rgb(220, 220, 220)");
        $(event.target).css("transform", "scale(1.1)");
        //Para que no suceda el bug de más de un mes "seleccionado"
        $(".month").not($(event.target)).css("background-color", "");
        $(".month").not($(event.target)).css("transform", "scale(1)");
    }
    if ($(event.target).hasClass("month-name")) {
        $(event.target).parent().css("background-color", "rgb(220, 220, 220)");
        $(event.target).parent().css("transform", "scale(1.1)");
        //Para que no suceda el bug de más de un mes "seleccionado"
        $(".month").not($(event.target)).parent().css("background-color", "");
        $(".month").not($(event.target)).parent().css("transform", "scale(1)");
    }
    if ($(event.target).hasClass("week-days")) {
        $(event.target).parent().parent().css("background-color", "rgb(220, 220, 220)");
        $(event.target).parent().parent().css("transform", "scale(1.1)");
        //Para que no suceda el bug de más de un mes "seleccionado"
        $(".month").not($(event.target)).parent().parent().css("background-color", "");
        $(".month").not($(event.target)).parent().parent().css("transform", "scale(1)");
    }
}

function monthMouseOut(event) {
    if ($(event.target).hasClass("month")) {
        $(event.target).css("background-color", "");
        $(event.target).css("transform", "scale(1)");
    }
    if ($(event.target).hasClass("week-days")) {
        $(".month").css("background-color", "");
        $(".month").css("transform", "scale(1)");
    }
}
/**********************Month Hover**********************/

/**********************Generate Month Days**********************/
function generateMonthDays(index, index2, year) {
    $(".row.week-row").last().append("<div class='col custom7 dayContainer'><span class='days' id='" + moment((index2 + 1) + "-" + (index + 1) + "-" + year + "00:00", "DD-MM-YYYY HH:mm").valueOf() + "'>" + (index2 + 1) + "</span>");
}

function modalGenerateMonthDays(index, index2, year) {
    $(".row.modal-week-row").last().append("<div class='col custom7'><span>" + (index2 + 1) + "</span>");
}

function monthViewGenerateMonthDays(index, index2, year) {
    $(".month-week-row").last().append("<div class='month-actual-days'><span id='" + moment((index2 + 1) + "-" + (index + 1) + "-" + year + "00:00", "DD-MM-YYYY HH:mm").valueOf() + "'>" + (index2 + 1) + "</span>");
}
/**********************Generate Month Days**********************/
/**********************Post-generation Classes & IDs assignment**********************/
//Asignación después de generarse el calendario de clases e ids a semanas, etc.
function assignment() {
    $(".week-row").each(function (index, value) {
        if ($(".week-row").eq(index).find(".days").length == 0) {
            $(".week-row").eq(index).addClass("disabled-weeks");
        }
        if ($(".week-row").eq(index).find(".days").length != 0 && $(".week-row").eq(index).find(".disabledDays").length != 0) {
            $(".week-row").eq(index).addClass("partially-disabled-weeks");
        }

        if ($(this).find(".days").length > 0) {
            //Si es la primera semana de diciembre
            if (moment(parseInt($(this).find(".days").first().attr("id"))).month() == 11 && moment(parseInt($(this).find(".days").first().attr("id"))).week() == 1) {
                if ($("#week" + moment(parseInt($(this).find(".days").first().attr("id"))).week() + "-" + (year + 1)).length > 0) {
                    $(this).attr("id", "repeated_week" + moment(parseInt($(this).find(".days").first().attr("id"))).week() + "-" + (year + 1));
                } else {
                    $(this).attr("id", "week" + moment(parseInt($(this).find(".days").first().attr("id"))).week() + "-" + (year + 1));
                }
                //Si la primera semana del mes de enero correspone a la semana 52 o 53 del año anterior, se pone el año anterior
            } else if (moment(parseInt($(this).find(".days").first().attr("id"))).month() == 0 && (moment(parseInt($(this).find(".days").first().attr("id"))).week() == 52 || moment(parseInt($(this).find(".days").first().attr("id"))).week() == 53)) {
                $(this).attr("id", "week" + moment(parseInt($(this).find(".days").first().attr("id"))).week() + "-" + (year - 1));
            } else {
                //Si ya existe una semana con id de weekDD-YYYY
                if ($("#week" + moment(parseInt($(this).find(".days").first().attr("id"))).week() + "-" + year).length > 0) {
                    $(this).attr("id", "repeated_week" + moment(parseInt($(this).find(".days").first().attr("id"))).week() + "-" + year);
                } else {
                    $(this).attr("id", "week" + moment(parseInt($(this).find(".days").first().attr("id"))).week() + "-" + year);
                }
            }
        }
    });
    $(".disabled-weeks").each(function (index, value) {
        if ($(this).prev().attr("id") != undefined) {
            var idWidth;
            if ($(this).prev().attr("id").indexOf("repeated") != -1) {
                idWidth = 13;
            } else {
                idWidth = 4;
            }
            var prevId;
            if ($(this).prev().hasClass("disabled-weeks")) {
                prevId = $(this).prev().prev().attr("id").split("-");
                prevId[0] = "week" + (parseInt(prevId[0].substr(idWidth, prevId[0].length)) + 1);
            } else {
                prevId = $(this).prev().attr("id").split("-");
            }
            if (parseInt(prevId[0].substr(idWidth, prevId[0].length)) + 1 > 52) {
                prevId[0] = "week1";
                prevId[1] = (parseInt(prevId[1]) + 1).toString();
            } else {
                prevId[0] = "week" + (parseInt(prevId[0].substr(idWidth, prevId[0].length)) + 1);
            }
        } else {
            var prevId;
            if ($(this).prev().hasClass("disabled-weeks")) {
                prevId = $(this).prev().prev().attr("id").split("-");
                prevId[0] = "week" + (parseInt(prevId[0].substr(idWidth, prevId[0].length)) + 1);
            } else {
                prevId = $(this).prev().attr("id").split("-");
            }
            if (parseInt(prevId[0].substr(idWidth, prevId[0].length)) + 1 > 52) {
                prevId[0] = "week" + (parseInt(prevId[0].substr(idWidth, prevId[0].length)) + 1);
            } else {
                prevId[0] = "week" + (parseInt(prevId[0].substr(idWidth, prevId[0].length)) + 2);
            }
        }
        $(this).attr("id", "disabled_" + prevId[0] + "-" + prevId[1]);
    });
}

function monthViewAssignment() {
    $(".month-week-row").each(function (index, value) {
        if ($(".month-week-row").eq(index).find(".month-actual-days").length == 0) {
            $(".month-week-row").eq(index).addClass("disabled-weeks");
        }
        if ($(".month-week-row").eq(index).find(".month-actual-days").length != 0 && $(".month-week-row").eq(index).find(".month-previous-days").length != 0) {
            $(".month-week-row").eq(index).addClass("partially-disabled-weeks");
        }
        if ($(".month-week-row").eq(index).find(".month-actual-days").length != 0 && $(".month-week-row").eq(index).find(".month-next-days").length != 0) {
            $(".month-week-row").eq(index).addClass("partially-disabled-weeks");
        }
    });

}
/**********************Post-generation Classes & IDs assignment**********************/

/**********************Events Functions**********************/

function hideYearInput() {
    $("#yearChangeInputContainer").hide();
    $("#yearNumber").fadeIn(500);
    $(".next-prev-buttons").fadeIn(1000);
}

function loginDisable() {
    $("#userInput").add($("#passwordInput")).attr("disabled", "disabled");
    $("#loginButton").addClass("disabled");
    $("#loginContainer").css("background-color", "rgb(200, 200, 200)");
    $("#logoutButtonContainer").fadeIn();
    $("#loginWindowButton").attr("data-tooltip", "Cerrar Sesión");
}

function loginEnable() {
    $("#userInput").add($("#passwordInput")).removeAttr("disabled");
    $("#loginButton").removeClass("disabled");
    $("#loginContainer").css("background-color", "white");
    $("#logoutButtonContainer").fadeOut();
    $("#loginWindowButton").attr("data-tooltip", "Iniciar Sesión");
}

function addPulseHover() {
    $(".waves-effect").not(".modal-close").not("#initModalClose").not("#addEventButton").hover(function() {
        $(this).addClass("pulse");
    }, function() {
        $(this).removeClass("pulse");
    });
}

/**********************Events Functions**********************/
/**********************Color Traductor**********************/
function colorTraductor(color) {
    switch (color) {
        case "red":
            return "#f44336";
            break;
        case "pink":
            return "#e91e63";
            break;
        case "purple":
            return "#9c27b0";
            break;
        case "blue":
            return "#2196f3";
            break;
        case "lime":
            return "#cddc39";
            break;
        case "green":
            return "#4caf50";
            break;
        case "yellow":
            return "#ffeb3b";
            break;
        case "orange":
            return "#ff9800";
            break;
        case "brown":
            return "#795548";
            break;
        case "grey":
            return "#9e9e9e";
            break;
    }
}
/**********************Color Traductor**********************/
/**********************BBDD Check and Creation**********************/
function checkBBDD() {
    $.get("./src/funcs/funcs.php?checkBBDD", function () {}).done(function (data) {
        if (data == "0") {
            $.get("./src/funcs/funcs.php?createBBDD", function () {}).done(function (data) {
                console.log(data);
            });
        }
    });
}
/**********************BBDD Check and Creation**********************/
/**********************BBDD Query Day**********************/
function queryDay(date) {
    var receivedData;
    var adminStatus;
    $("#eventsContainer").html("");
    $.get("./src/funcs/funcs.php?queryDay=" + date, function () {}).done(function (data) {
        receivedData = data;
        $.get("./src/funcs/funcs.php?adminRequest", function () {}).done(function (data) {
            adminStatus = data;
            if (receivedData != "[]") {
                if (adminStatus == "true") {
                    for (var i = 0; i < JSON.parse(receivedData).length; i++) {
                        var iteratedHours = new Array();
                        $.each(JSON.parse(JSON.parse(receivedData)[i].hours.replace(/'/g, '"')), function(index, value) {
                            if (value == "true") {
                                iteratedHours.push(index);
                            }
                        });
                        if (iteratedHours[0] == "1" && iteratedHours[iteratedHours.length - 1] == "24") {
                            $("#eventsContainer").append("<div class='eventsViewEventAdmin events " + JSON.parse(receivedData)[i].color + "'><span><b>Título</b>: " + JSON.parse(receivedData)[i].event + "</span><span class='remove-event-button-container'><a id='remove-event-" + JSON.parse(receivedData)[i].id + "' class='btn-floating btn-small waves-effect waves-light red accent-4 tooltipped remove-event-button' data-position='left' data-tooltip='Eliminar evento'><i class='material-icons'>delete_forever</i></a><a id='edit-event-" + JSON.parse(receivedData)[i].id + "' data-edit='" + JSON.stringify(JSON.parse(receivedData)[i]) + "' class='btn-floating btn-small waves-effect waves-light cyan lighten-1 tooltipped edit-event-button' data-position='right' data-tooltip='Editar evento'><i class='material-icons'>edit</i></a></span><span><b>Duración</b>: Todo el día</span></div>");
                        } else {
                            $("#eventsContainer").append("<div class='eventsViewEventAdmin events " + JSON.parse(receivedData)[i].color + "'><span><b>Título</b>: " + JSON.parse(receivedData)[i].event + "</span><span class='remove-event-button-container'><a id='remove-event-" + JSON.parse(receivedData)[i].id + "' class='btn-floating btn-small waves-effect waves-light red accent-4 tooltipped remove-event-button' data-position='left' data-tooltip='Eliminar evento'><i class='material-icons'>delete_forever</i></a><a id='edit-event-" + JSON.parse(receivedData)[i].id + "' data-edit='" + JSON.stringify(JSON.parse(receivedData)[i]) + "' class='btn-floating btn-small waves-effect waves-light cyan lighten-1 tooltipped edit-event-button' data-position='right' data-tooltip='Editar evento'><i class='material-icons'>edit</i></a></span><span><b>Duración</b>: " + iteratedHours[0] + ":00h - " + iteratedHours[iteratedHours.length - 1] + ":00h</span></div>");
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
                        $("#editDaySpecified").text("Se va editar un evento para el " + $(this).parent().parent().parent().parent().find("#card-title1").text());
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
                            for (var i = parseInt($("#editTest-slider")[0].noUiSlider.get()[0].substr(0, $("#test-slider")[0].noUiSlider.get()[0].length - 2)); i <= parseInt($("#editTest-slider")[0].noUiSlider.get()[1].substr(0, $("#editTest-slider")[0].noUiSlider.get()[0].length - 2)); i++) {
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
                    for (var i = 0; i < JSON.parse(receivedData).length; i++) {
                        var iteratedHours = new Array();
                        $.each(JSON.parse(JSON.parse(receivedData)[i].hours.replace(/'/g, '"')), function(index, value) {
                            if (value == "true") {
                                iteratedHours.push(index);
                            }
                        });
                        if (iteratedHours[0] == "1" && iteratedHours[iteratedHours.length - 1] == "24") {
                            $("#eventsContainer").append("<div class='eventsViewEvent events " + JSON.parse(receivedData)[i].color + "'><span><b>Título</b>: " + JSON.parse(receivedData)[i].event + "</span></span><span><b>Duración</b>: Todo el día</span></div>");
                        } else {
                            $("#eventsContainer").append("<div class='eventsViewEvent events " + JSON.parse(receivedData)[i].color + "'><span><b>Título</b>: " + JSON.parse(receivedData)[i].event + "</span></span><span><b>Duración</b>: " + iteratedHours[0] + ":00h - " + iteratedHours[iteratedHours.length - 1] + ":00h</span></div>");
                        }
                    }
                }
                $(".remove-event-button").tooltip();
                $(".edit-event-button").tooltip();
            } else {
                $("#eventsContainer").append("<div class='emptyEvent'><span>No hay eventos para éste dia</span></div>");
            }
            $("#roundedPreloader").fadeOut();
        });
    });
}
/**********************BBDD Query Day**********************/
/**********************Views**********************/

function yearView() {
    $(".progress").fadeIn();
    $("#month").fadeOut(200);
    $("#resetYearButton").fadeIn(200);
    $("#eventsView").fadeOut(200);
    //Se elimina el footer y luego se vuelve a generar para evitar flickering
    $(".page-footer").remove();
    $(".flex-container.main-calendar").html("");
    $("#year").fadeIn(200);
    var count = 0;
    var count2 = 1;
    var param;
    var weekDays = ["L", "M", "X", "J", "V", "S", "D"];
    var fullWeekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    $(".switch").hide();
    $("#monthBlockquote").text("");
    $("#eventsBlockquote").text("");
    $(".flex-container.main-calendar").html("");
    $("#infoFeatureDiscovery").find("div").html("<h5>Mantén la tecla CTRL</h5><p>Para seleccionar solo meses y semanas</p><h5>Mantén la tecla Shift</h5><p>Para seleccionar solo los meses</p>");
    $.get("./src/funcs/funcs.php?yearRequest", function () {}).done(function (data) {
        year = parseInt(data);
        $.get("./src/funcs/funcs.php?adminRequest", function () {}).done(function (data) {
            if (data == "true") {
                $(".adminElements").show();
            } else {
                $(".adminElements").hide();
            }
            $("title").text("Plainer | " + year);
            $("#yearNumber").text(year);
            $("#yearBlockquote").text("Año: " + year);
            $(".flex-container.main-calendar").append("<div class='month-row'></div>");
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 3; j++) {
                    $(".month-row").last().append("<div class='flex-item month-container'><div class='month' id='" + count + "'></div>");
                    count++;
                }
            }
            for (var i = 0; i < 12; i++) {
                var monthName = moment("01-" + (i + 1) + "-" + year, "DD-MM-YYYY").format("MMMM");
                monthName = monthName.substr(0, 1).toUpperCase() + monthName.substr(1, monthName.length);
                $("#" + i).append("<div class='month-name'>" + monthName + "</div>");
                $("#" + i).append("<div class='row week-days-container'></div>");
                for (var j = 0; j < 7; j++) {
                    $(".week-days-container").last().append("<div class='col custom7 week-days'>" + weekDays[j] + "</div>");
                }
                //Switch filtra según el día de la semana en que empiece un mes
                switch (moment("01-" + (i + 1) + "-" + year, "DD-MM-YYYY").weekday()) {
                    case 0:
                        param = 0;
                        break;
                    case 1:
                        param = 1;
                        break;
                    case 2:
                        param = 2;
                        break;
                    case 3:
                        param = 3;
                        break;
                    case 4:
                        param = 4;
                        break;
                    case 5:
                        param = 5;
                        break;
                    case 6:
                        param = 6;
                        break;
                }
                $("#" + i).append("<div class='row week-row'></div>");
                //Días del mes anterior
                if (i == 0) {
                    var previousMonthDays = (moment("01-12-" + year, "DD-MM-YYYY").daysInMonth() - param) + 1;
                } else {
                    var previousMonthDays = (moment("01-" + i + "-" + year,"DD-MM-YYYY").daysInMonth() - param) + 1;
                }
                for (var j = 0; j < param; j++) {
                    $(".row.week-row").last().append("<div class='col custom7'><span class='disabledDays'>" + previousMonthDays + "</span></div>");
                    previousMonthDays++;
                }
                //Días del mes actual
                for (var j = 0; j < moment("01-" + (i + 1) + "-" + year, "DD-MM-YYYY").daysInMonth(); j++) {
                    generateMonthDays(i, j, year);
                    if ((j + (param + 1)) % 7 == 0) {
                        $("#" + i).append("<div class='row week-row'></div>");
                    }
                }
                var repeat = 42 - (moment("01-" + (i + 1) + "-" + year, "DD-MM-YYYY").daysInMonth() + param);
                //Días del mes siguiente
                for (var z = 0; z < repeat; z++) {
                    $(".row.week-row").last().append("<div class='col custom7'><span class='disabledDays'>" + (z + 1) + "</span></div>");
                    //La segunda condición es para que no introduzca una séptima fila vacía
                    if ($(".week-row").last().children().length == 7 && z != (repeat - 1)) {
                        $("#" + i).append("<div class='row week-row'></div>");
                    }
                }
            }
            $("footer").append(footer);
            var presentDay = $("#" + moment(moment().format("DD") + "-" + (moment().month() + 1) + "-" + moment().year() + " 00:00", "DD-MM-YYYY HH:mm").valueOf());
            presentDay.addClass("presentDay");
            //Se asignan clases e ids a diversos elementos
            assignment();
            $.get("./src/funcs/funcs.php?queryAll", function () {}).done(function (data) {
                var dates = JSON.parse(data);
                var firstColor, secondColor;
                for (var i = 0; i < dates.length; i++) {
                    if ($("#" + dates[i].date).length > 0) {
                        switch ($("#" + dates[i].date).attr("data-color")) {
                            case undefined:
                                //Single color
                                $("#" + dates[i].date).addClass(dates[i].color);
                                $("#" + dates[i].date).attr("data-color", "single");
                                firstColor = colorTraductor(dates[i].color);
                                break;
                            case "single":
                                //Dual color
                                $("#" + dates[i].date).css("background", "linear-gradient(135deg, " + colorTraductor($("#" + dates[i].date).attr("class").split(" ")[1]) + " 50%, " + colorTraductor(dates[i].color) + " 50%)");
                                $("#" + dates[i].date).attr("data-color", "dual");
                                secondColor = colorTraductor(dates[i].color);
                                break;
                            case "dual":
                                //Triple color
                                $("#" + dates[i].date).css("background", "linear-gradient(135deg, " + colorTraductor($("#" + dates[i].date).attr("class").split(" ")[1]) + " 0," + colorTraductor($("#" + dates[i].date).attr("class").split(" ")[1]) + " 33%, " + secondColor + " 33%, " + secondColor + " 66%," + colorTraductor(dates[i].color) + " 66%," + colorTraductor(dates[i].color) + " 100%)");
                                $("#" + dates[i].date).attr("data-color", "triple");
                                break;
                            case "triple":
                                //Multicolor
                                $("#" + dates[i].date).css("background", "linear-gradient(135deg,red,orange,yellow,green,blue,indigo,violet)");
                                $("#" + dates[i].date).addClass("white-overwrite");
                                $("#" + dates[i].date).attr("data-color", "multi");
                                break;
                        }
                    }
                }
            //Eventos
            $(".days").click(function (event) {
                event.stopPropagation(); //Para evitar que salte el evento de la semana
                $("#roundedPreloader").show();
                $("#daysModal2 .card-reveal").attr("id", "card-day" + $(this).attr("id"));
                //Si se hace click en un día después de haber desplegado el reveal anteriormente, lo cierra para éste nuevo día clickado
                if ($("#daysModal2 .card-reveal").attr("style") == "display: block; transform: translateY(-100%);") {
                    $("#closeCardReveal").click();
                }
                $("#daysModal2").find("#card-title1").text(fullWeekDays[moment(parseInt($(this).attr("id"))).weekday()] + " " + moment(parseInt($(this).attr("id"))).format("D") + " de " + moment(parseInt($(this).attr("id"))).format("MMMM") + " de " + moment(parseInt($(this).attr("id"))).year());
                $("#daysModal2").find("#card-title2").text(fullWeekDays[moment(parseInt($(this).attr("id"))).weekday()] + " " + moment(parseInt($(this).attr("id"))).format("D") + " de " + moment(parseInt($(this).attr("id"))).format("MMMM") + " de " + moment(parseInt($(this).attr("id"))).year());
                queryDay($(event.target).attr("id"));
                $("#daysModal2").modal("open");
            });
            $(".month").mouseover(function (event) {
                monthMouseOver(event);
            });

            $(".month").mouseout(function (event) {
                monthMouseOut(event);
            });
            $(".month").click(function (event) {
                var month;
                if ($(event.target).hasClass("month") || $(event.target).hasClass("month-name")) {
                    month = moment("01-" + (parseInt($(this).attr("id")) + 1) + "-" + year, "DD-MM-YYYY").format("M");
                } else if ($(event.target).hasClass("week-days")) { //Para que se dispare cuando no saltan los días y se hace click en ellos (ctrlKey)
                    month = moment("01-" + (parseInt($(event.target).parent().prev().parent().attr("id")) + 1) + "-" + year, "DD-MM-YYYY").format("M");
                }
                $.get("./src/funcs/funcs.php?monthChange=" + parseInt(month) + "&viewChange=month", function () {}).done(function () {
                    $("#year").fadeOut(200);
                    $(".flex-container.main-calendar").fadeOut(200);
                    setTimeout(function () {
                        monthView();
                        $("#viewSelect").val("month");
                        $("#viewSelect").formSelect();
                        $(".flex-container.main-calendar").fadeIn(200)
                    }, 200);
                });
            });
            $(document).mousemove(function (event) {
                if (event.ctrlKey) {
                    $(".days").css("pointer-events", "none");
                } else {
                    $(".days").css("pointer-events", "");
                }

                if (event.shiftKey) {
                    $(".week-row").css("pointer-events", "none");
                } else {
                    $(".week-row").css("pointer-events", "");
                }
                //Una medida más para prevenir que algún mes se quede seleccionado depués de hacer hover
                if ($(event.target).prop("tagName") == "MAIN" || $(event.target).attr("id") == "year") {
                    $(".month").not($(event.target)).css("background-color", "");
                    $(".month").not($(event.target)).css("transform", "scale(1)");
                }
            });
            $(".week-row").hover(function (event) {
                    if ($(this).parent().parent().prev().find(".disabled-weeks").prev().find(".days").length > 0) {
                        if ($(this).parent().parent().prev().find(".disabled-weeks").length > 1) {
                            if (moment(parseInt($(this).parent().parent().prev().find(".disabled-weeks").eq(1).prev().prev().find(".days").attr("id"))).week() + 2 == moment(parseInt($(this).find(".days").first().attr("id"))).week()) {
                                $(this).parent().parent().prev().find(".disabled-weeks").eq(1).addClass("manualRowHover");
                            }
                            if (moment(parseInt($(this).parent().parent().prev().find(".disabled-weeks").eq(0).prev().prev().find(".days").attr("id"))).week() + 2 == moment(parseInt($(this).find(".days").first().attr("id"))).week()) {
                                $(this).parent().parent().prev().find(".disabled-weeks").eq(0).addClass("manualRowHover");
                            }
                        } else {
                            if (moment(parseInt($(this).parent().parent().prev().find(".disabled-weeks").prev().find(".days").attr("id"))).week() + 1 == moment(parseInt($(this).find(".days").first().attr("id"))).week()) {
                                $(this).parent().parent().prev().find(".disabled-weeks").addClass("manualRowHover");
                            }
                        }
                    }
                },
                function (event) {
                    if ($(this).parent().parent().prev().find(".disabled-weeks").prev().find(".days").length > 0) {
                        if ($(this).parent().parent().prev().find(".disabled-weeks").length >1) {
                            if (moment(parseInt($(this).parent().parent().prev().find(".disabled-weeks").eq(1).prev().prev().find(".days").attr("id"))).week() + 2 == moment(parseInt($(this).find(".days").first().attr("id"))).week()) {
                                $(this).parent().parent().prev().find(".disabled-weeks").eq(1).removeClass("manualRowHover");
                            }
                            if (moment(parseInt($(this).parent().parent().prev().find(".disabled-weeks").eq(0).prev().prev().find(".days").attr("id"))).week() + 2 == moment(parseInt($(this).find(".days").first().attr("id"))).week()) {
                                $(this).parent().parent().prev().find(".disabled-weeks").eq(0).removeClass("manualRowHover");
                            }
                        } else {
                            if (moment(parseInt($(this).parent().parent().prev().find(".disabled-weeks").prev().find(".days").attr("id"))).week() + 1 == moment(parseInt($(this).find(".days").first().attr("id"))).week()) {
                                $(this).parent().parent().prev().find(".disabled-weeks").removeClass("manualRowHover");
                            }
                        }
                    }
                });

                $(".week-row").click(function (event) {
                    event.stopPropagation(); //Para que no se propage el click al evento de click de .month (var month daría undefined)
                    $("#roundedPreloader2").show();
                    var idWidth;
                    var count = 1;
                    if ($(this).attr("id").indexOf("repeated") != -1 || $(this).attr("id").indexOf("disabled") != -1) {
                        idWidth = 13;
                    } else {
                        idWidth = 4;
                    }
                    var id = $(this).attr("id").split("-");
                    $("#bottomModal").find("h4").text("Semana " + id[0].substr(idWidth, id[0].length) + " de " + id[1]);
                    //Primero vaciar todo el contenido, para que cuando se abra una nueva columna no guarde el contenido de la columna anterior
                    $("#bottomModal").find(".row").text("");
                    for (var i = 0; i < 7; i++) {
                        $("#bottomModal").find(".row").append("<div class='col custom7 fullWeekDays'>" + fullWeekDays[i] + "</div>");
                    }
                    for (var i = 0; i < 7; i++) {
                        if ($(this).find("span").eq(i).attr("id") == undefined) {
                            //Si el mes es enero o el mes de diciembre
                            if ($(this).parent().attr("id") == "0") {
                                if (parseInt($(this).children().eq(i).children().text()) > 15) {
                                    $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week days-on-week-disabled'>" + $(this).children().eq(i).children().text() + "</span></div>");
                                } else {
                                    var actual = $(this);
                                    $(this).parent().parent().next().find(".days").each(function (index, value) {
                                        if ($(this).text() == actual.find("span").eq(i).text()) {
                                            $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week enabled' id='week-day" + $(this).attr("id") + "'>" + actual.children().eq(i).children().text() + "</span></div>");
                                        }
                                    });
                                }
                            } else if ($(this).parent().attr("id") == "11") {
                                if (parseInt($(this).children().eq(i).children().text()) < 15) {
                                    //Si $(this) es la última semana de diciembre con todo disabled days (con lo cuál será la primera o segunda semana del año siguiente)
                                    if ($(this).hasClass("disabled-weeks")) {
                                        $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week days-on-week-disabled' id='week-day" + moment(parseInt($(this).prev().find("span").eq(0).attr("id"))).add(i + 7, "days").valueOf() + "'>" + $(this).children().eq(i).children().text() + "</span></div>");
                                    } else {
                                        //A la última semana compartida (disabled y enabled) de diciembre se le ponen ids a sus días sumandole días al último dia del año actual
                                        $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week days-on-week-disabled' id='week-day" + moment(parseInt($(this).find("span").eq(0).attr("id"))).add(i, "days").valueOf() + "'>" + $(this).children().eq(i).children().text() + "</span></div>");
                                    }
                                } else {
                                    var actual = $(this);
                                    $(this).parent().parent().prev().find(".days").each(function (index, value) {
                                        if ($(this).text() == actual.find("span").eq(i).text()) {
                                            $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week enabled' id='week-day" + $(this).attr("id") + "'>" + actual.children().eq(i).children().text() + "</span></div>");
                                        }
                                    });
                                }
                            } else {
                                var actual = $(this);
                                //Si es la primera semana del mes
                                if (actual.attr("id") == actual.parent().children().eq(2).attr("id")) {
                                    $(this).parent().parent().prev().find(".days").each(function (index, value) {
                                        if ($(this).text() == actual.find("span").eq(i).text()) {
                                            $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week enabled' id='week-day" + $(this).attr("id") + "'>" + actual.children().eq(i).children().text() + "</span></div>");
                                        }
                                    });
                                } else {
                                    $(this).parent().parent().next().find(".days").each(function (index, value) {
                                        if ($(this).text() == actual.find("span").eq(i).text()) {
                                            $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week enabled' id='week-day" + $(this).attr("id") + "'>" + actual.children().eq(i).children().text() + "</span></div>");
                                        }
                                    });
                                }
                            }
                        } else {
                            $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week enabled' id='" + "week-day" + $(this).find("span").eq(i).attr("id") + "'>" + $(this).children().eq(i).children().text() + "</span></div>");
                        }
                    }
                    //Se añaden ids (en bottomModal) a los primeros días del año anterior en enero a posteriori, una vez generados
                    if ($(this).parent().attr("id") == "0") {
                        if ($("#0").children().eq(2).find(".disabledDays").length > 0) {
                            var amount = $("#0").children().eq(2).find(".disabledDays").length;
                            for (var i = 0; i < $("#0").children().eq(2).find(".disabledDays").length; i++) {
                                $("#bottomModal").find(".days-on-week-disabled").eq(i).attr("id", "week-day" + moment(parseInt($("#bottomModal").find(".enabled").eq(0).attr("id").substr(8, $("#bottomModal").find(".enabled").eq(0).attr("id").length))).subtract(amount, "days").valueOf());
                                amount--;
                            }
                        }
                    }
                    $("#bottomModal").find("span").each(function (index, value) {
                        $.get("./src/funcs/funcs.php?queryDay=" + $(this).attr("id").substr(8, $(this).attr("id").length), function () {}).done(function (data) {
                            if (data != "[]") {
                                var firstColor, secondColor, thirdColor;
                                for (var i = 0; i < JSON.parse(data).length; i++) {
                                    switch (i) {
                                        case 0:
                                            $("#week-day" + JSON.parse(data)[i].date).css("color", colorTraductor(JSON.parse(data)[0].color));
                                            firstColor = colorTraductor(JSON.parse(data)[0].color);
                                            break;
                                        case 1:
                                            $("#week-day" + JSON.parse(data)[i].date).css("background", "-webkit-linear-gradient(135deg, " + firstColor + " 50%, " + colorTraductor(JSON.parse(data)[i].color) + " 50%)");
                                            $("#week-day" + JSON.parse(data)[i].date).css("-webkit-background-clip", "text");
                                            $("#week-day" + JSON.parse(data)[i].date).css("-webkit-text-fill-color", "transparent");
                                            secondColor = colorTraductor(JSON.parse(data)[i].color);
                                            break;
                                        case 2:
                                            $("#week-day" + JSON.parse(data)[i].date).css("background", "-webkit-linear-gradient(135deg, " + firstColor + " 0," + firstColor + " 33%, " + secondColor + " 33%, " + secondColor + " 66%," + colorTraductor(JSON.parse(data)[i].color) + " 66%," + colorTraductor(JSON.parse(data)[i].color) + " 100%)");
                                            $("#week-day" + JSON.parse(data)[i].date).css("-webkit-background-clip", "text");
                                            $("#week-day" + JSON.parse(data)[i].date).css("-webkit-text-fill-color", "transparent");
                                            thirdColor = colorTraductor(JSON.parse(data)[i].color);
                                            break;
                                        case 3:
                                            $("#week-day" + JSON.parse(data)[i].date).css("background", "-webkit-linear-gradient(135deg,red,orange,yellow,green,blue,indigo,violet)");
                                            $("#week-day" + JSON.parse(data)[i].date).css("-webkit-background-clip", "text");
                                            $("#week-day" + JSON.parse(data)[i].date).css("-webkit-text-fill-color", "transparent");
                                            break;
                                    }
                                }
                            }
                            $("#roundedPreloader2").fadeOut();
                        });
                    });
                    //Evento click dentro de otro evento click, dado que si se pusiera fuera, .days-on-week estaría vacio (.days-on-week se genera en el click de .week-row)
                    $(".days-on-week").click(function (event) {
                        $("#bottomModal").modal("close");
                        if ($("#" + $(this).attr("id").substr(8, $(this).attr("id").length)).length > 0) {
                            //$("#" + $(this).attr("id").substr(8, $(this).attr("id").length)).trigger("click");
                            $("#roundedPreloader").show();
                            if ($(this).attr("id").indexOf("week-day") != -1) {
                                $("#daysModal2 .card-reveal").attr("id", "card-day" + $(this).attr("id").substr(8, $(this).attr("id").length));
                            } else {
                                $("#daysModal2 .card-reveal").attr("id", "card-day" + $(this).attr("id"));
                            }
                            //Si se hace click en un día después de haber desplegado el reveal anteriormente, lo cierra para éste nuevo día clickado
                            if ($("#daysModal2 .card-reveal").attr("style") == "display: block; transform: translateY(-100%);") {
                                $("#closeCardReveal").click();
                            }
                            var thisDate = moment(parseInt($(this).attr("id").substr(8, $(this).attr("id").length)));
                            $("#daysModal2").find("#card-title1").text(fullWeekDays[thisDate.weekday()] + " " + thisDate.format("D") + " de " + thisDate.format("MMMM") + " de " + thisDate.year());
                            $("#daysModal2").find("#card-title2").text(fullWeekDays[thisDate.weekday()] + " " + thisDate.format("D") + " de " + thisDate.format("MMMM") + " de " + thisDate.year());
                            queryDay($(this).attr("id").substr(8, $(this).attr("id").length));
                            setTimeout(function() {$("#daysModal2").modal("open");},400);
                        } else {
                            $("#roundedPreloader").show();
                            $("#daysModal2 .card-reveal").attr("id", "card-day" + $(this).attr("id").substr(8, $(this).attr("id").length));
                            //Si se hace click en un día después de haber desplegado el reveal anteriormente, lo cierra para éste nuevo día clickado
                            if ($("#daysModal2 .card-reveal").attr("style") == "display: block; transform: translateY(-100%);") {
                                $("#closeCardReveal").click();
                            }
                            var thisDate = moment(parseInt($(this).attr("id").substr(8, $(this).attr("id").length)));
                            $("#daysModal2").find("#card-title1").text(fullWeekDays[thisDate.weekday()] + " " + thisDate.format("D") + " de " + thisDate.format("MMMM") + " de " + thisDate.year());
                            $("#daysModal2").find("#card-title2").text(fullWeekDays[thisDate.weekday()] + " " + thisDate.format("D") + " de " + thisDate.format("MMMM") + " de " + thisDate.year());
                            queryDay($(this).attr("id").substr(8, $(this).attr("id").length));
                            setTimeout(function() {$("#daysModal2").modal("open");}, 400);
                        }
                    });
                    $("#bottomModal").modal("open");
                });
                /*
                La variable temp (utilizada en los próximos eventos) guarda el número de semana de
                la fila afectada por el evento
                */
                $(".disabled-weeks").hover(function (event) {
                    var temp;
                    if ($(this).prev().hasClass("disabled-weeks")) {
                        temp = moment(parseInt($(this).prev().prev().find(".days").first().attr("id"))).week() + 2;
                    } else {
                        temp = moment(parseInt($(this).prev().find(".days").first().attr("id"))).week() + 1;
                    }
                    $(this).parent().parent().next().find(".week-row").not(".disabled-weeks").each(function (index, value) {
                        if (moment(parseInt($(value).find(".days").first().attr("id"))).week() == temp) {
                            $(value).addClass("manualRowHover");
                        }
                    });

                }, function (event) {
                    var temp;
                    if ($(this).prev().hasClass("disabled-weeks")) {
                        temp = moment(parseInt($(this).prev().prev().find(".days").first().attr("id"))).week() + 2;
                    } else {
                        temp = moment(parseInt($(this).prev().find(".days").first().attr("id"))).week() + 1;
                    }
                    $(this).parent().parent().next().find(".week-row").not(".disabled-weeks").each(function (index, value) {
                        if (moment(parseInt($(value).find(".days").first().attr("id"))).week() == temp) {
                            $(value).removeClass("manualRowHover");
                        }
                    });
                });

                $(".partially-disabled-weeks").hover(function (event) {
                    var temp = moment(parseInt($(this).find(".days").first().attr("id"))).week();
                    var prev = $(this).parent().parent().prev().find(".partially-disabled-weeks");
                    $(this).parent().parent().next().find(".partially-disabled-weeks").add(prev).each(function (index, value) {
                        if (moment(parseInt($(value).find(".days").first().attr("id"))).week() == temp) {
                            $(value).addClass("manualRowHover");
                        }
                    });
                }, function (event) {
                    var temp = moment(parseInt($(this).find(".days").first().attr("id"))).week();
                    var prev = $(this).parent().parent().prev().find(".partially-disabled-weeks");
                    $(this).parent().parent().next().find(".partially-disabled-weeks").add(prev).each(function (index, value) {
                        if (moment(parseInt($(value).find(".days").first().attr("id"))).week() == temp) {
                            $(value).removeClass("manualRowHover");
                        }
                    });
                });
                $("#yearNumber").click(function (event) {
                    $(this).hide();
                    $(".next-prev-buttons").hide();
                    $("#yearChangeInputContainer").fadeIn(500);
                    $("#yearChangeInput").val($(this).text());
                    $("#yearChangeInput").select();
                });
                //Off dado que si se vuelve a ejecutar yearView(), los event handlers se acumulan y se llaman múltiples veces
                $("#yearChangeButton").off();
                $("#yearChangeButton").click(function (event) {
                    if ($("#yearChangeInput").val() != $("#yearNumber").text()) {
                        $.get("./src/funcs/funcs.php?yearChange=" + $("#yearChangeInput").val(), function () {}).done(function () {
                                $.get("./src/funcs/funcs.php?weekChange=1-" + $("#yearChangeInput").val(), function() {}).done(function() {
                                    hideYearInput();
                                    yearView();
                                });
                            });
                    } else {
                        hideYearInput();
                    }
                });
                //Off dado que si se vuelve a ejecutar yearView(), los event handlers se acumulan y se llaman múltiples veces
                $("#yearChangeInput").off();
                $("#yearChangeInput").on('keydown', function (event) {
                    if (event.which == 13 || event.keyCode == 13) {
                        $("#yearChangeButton").trigger("click");
                    }
                });

                $("#yearChangeBackButton").click(hideYearInput);
                //Off dado que si se vuelve a ejecutar yearView(), los event handlers se acumulan y se llaman múltiples veces
                $("#nextButton").off();
                $("#nextButton").click(function (event) {
                    $(".progress").fadeIn();
                    $.get("./src/funcs/funcs.php?yearChange=" + (parseInt($("#yearNumber").text()) + 1), function () {}).done(function () {
                            $.get("./src/funcs/funcs.php?weekChange=1-" + (parseInt($("#yearNumber").text()) + 1), function() {}).done(function() {
                            yearView();
                        });
                    });
                });
                //Off dado que si se vuelve a ejecutar yearView(), los event handlers se acumulan y se llaman múltiples veces
                $("#prevButton").off();
                $("#prevButton").click(function (event) {
                    $(".progress").fadeIn();
                    $.get("./src/funcs/funcs.php?yearChange=" + (parseInt($("#yearNumber").text()) - 1), function () {}).done(function () {
                            $.get("./src/funcs/funcs.php?weekChange=1-" + (parseInt($("#yearNumber").text()) - 1), function() {}).done(function() {
                            yearView();
                        });
                    });
                });
                //Off dado que si se vuelve a ejecutar yearView(), los event handlers se acumulan y se llaman múltiples veces
                $("#resetButton").off();
                $("#resetButton").attr("data-tooltip", "Volver al año actual");
                $("#resetButton").click(function (event) {
                    if (year != moment().year()) {
                        $(".progress").fadeIn();
                        $.get("./src/funcs/funcs.php?yearChange=" + moment().year(), function () {}).done(function () {
                                $.get("./src/funcs/funcs.php?weekChange=1-" + moment().year(), function() {}).done(function() {
                                hideYearInput();
                                yearView();
                            });
                        });
                    }
                });
                addPulseHover();
                $(".progress").fadeOut();
            });
        });
    });
}

function monthView() {
    $(".progress").fadeIn();
    $("#year").fadeOut(200);
    $("#resetYearButton").fadeIn(200);
    $("#eventsView").fadeOut(200);
    var month;
    var year;
    var weekNumber = 1;
    var param;
    var fullWeekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    //Se elimina el footer y luego se vuelve a generar cuando están todos los días generados para evitar flickering
    $(".page-footer").remove();
    $(".flex-container.main-calendar").html("");
    $("#eventsBlockquote").text("");
    $("#month").fadeIn();
    $("#resetButton").attr("data-tooltip", "Volver al año y mes actual");
    $("#infoFeatureDiscovery").find("div").html("<h5>Mantén la tecla CTRL</h5><p>Para seleccionar solo las semanas</p>");
    $.get("./src/funcs/funcs.php?monthRequest", function () {}).done(function (data) {
        month = parseInt(data);
        $.get("./src/funcs/funcs.php?yearRequest", function () {}).done(function (data) {
            year = parseInt(data);
            $.get("./src/funcs/funcs.php?adminRequest", function () {}).done(function (data) {
                if (data == "true") {
                    $(".adminElements").show();
                } else {
                    $(".adminElements").hide();
                }
                $(".switch").show();
                $("#blockYearSpan").show();
                $("#yearBlockquote").text("Año: " + year);
                $("#monthBlockquote").html("<br/>Mes: " + moment(parseInt(month), "MM").format("MMMM").substr(0, 1).toUpperCase() + moment(parseInt(month), "MM").format("MMMM").substr(1, moment(parseInt(month), "MM").format("MMMM").length));
                $("title").text("Plainer | " + moment(parseInt(month), "MM").format("MMMM").substr(0, 1).toUpperCase() + moment(parseInt(month), "MM").format("MMMM").substr(1, moment(parseInt(month), "MM").format("MMMM").length) + " " + year);
                $("#monthName").html(moment(parseInt(month), "MM").format("MMMM").substr(0, 1).toUpperCase() + moment(parseInt(month), "MM").format("MMMM").substr(1, moment(parseInt(month), "MM").format("MMMM").length));
                //Generación de mes
                $(".flex-container.main-calendar").append("<div class='monthView-container'></div>");
                $(".monthView-container").append("<div class='full-week-days'></div>");
                for (var i = 0; i < 7; i++) {
                    $(".full-week-days").append("<div>" + fullWeekDays[i] + "</div>");
                }
                switch (moment("01-" + month + "-" + year, "DD-MM-YYYY").weekday()) {
                    case 0:
                        param = 0;
                        break;
                    case 1:
                        param = 1;
                        break;
                    case 2:
                        param = 2;
                        break;
                    case 3:
                        param = 3;
                        break;
                    case 4:
                        param = 4;
                        break;
                    case 5:
                        param = 5;
                        break;
                    case 6:
                        param = 6;
                        break;
                }

                if (month == 1) {
                    var previousMonthDays = (moment("01-12-" + year, "DD-MM-YYYY").daysInMonth() - param) + 1;
                } else {
                    var previousMonthDays = (moment("01-" + (month - 1) + "-" + year, "DD-MM-YYYY").daysInMonth() - param) + 1;
                }
                $(".monthView-container").append("<div class='month-week-row' id='month-week" + weekNumber + "'></div>");
                weekNumber++;
                for (var i = 0; i < param; i++) {
                    $(".month-week-row").last().append("<div class='month-previous-days'><span>" + previousMonthDays + "</span></div>");
                    previousMonthDays++;
                }
                for (var i = 0; i < moment("01-" + month + "-" + year, "DD-MM-YYYY").daysInMonth(); i++) {
                    monthViewGenerateMonthDays((month - 1), i, year);
                    if ((i + (param + 1)) % 7 == 0) {
                        $(".monthView-container").last().append("<div class='month-week-row' id='month-week" + weekNumber + "'></div>");
                        weekNumber++;
                    }
                }
                var repeat = 42 - (moment("01-" + month + "-" + year, "DD-MM-YYYY").daysInMonth() + param);
                for (var i = 0; i < repeat; i++) {
                    $(".month-week-row").last().append("<div class='month-next-days'><span>" + (i + 1) + "</span></div>");
                    if ($(".month-week-row").last().children().length == 7 && i != (repeat - 1)) {
                        $(".monthView-container").append("<div class='month-week-row' id='month-week" + weekNumber + "'></div>");
                        weekNumber++;
                    }
                }
                var presentDay = $("#" + moment(moment().format("DD") + "-" + (moment().month() + 1) + "-" + moment().year() + " 00:00", "DD-MM-YYYY HH:mm").valueOf());
                presentDay.addClass("monthPresentDay");
                monthViewAssignment();
                //Después de todo el contenido, se genera el footer para evitar flickering
                $("footer").append(footer);
                $.get("./src/funcs/funcs.php?queryAll", function () {}).done(function (data) {
                    var dates = JSON.parse(data);
                    var firstColor, secondColor;
                    for (var i = 0; i < dates.length; i++) {
                        if ($("#" + dates[i].date).length > 0) {
                            switch ($("#" + dates[i].date).attr("data-color")) {
                                case undefined:
                                    //Single color
                                    $("#" + dates[i].date).addClass(dates[i].color);
                                    $("#" + dates[i].date).attr("data-color", "single");
                                    firstColor = colorTraductor(dates[i].color);
                                    break;
                                case "single":
                                    //Dual color
                                    //Sin razón aparente, utilizando .css() no funciona en éste caso particular, hay que usar .attr("style")
                                    $("#" + dates[i].date).css("background", "linear-gradient(135deg, " + firstColor + " 50%, " + colorTraductor(dates[i].color) + " 50%)");
                                    $("#" + dates[i].date).attr("data-color", "dual");
                                    secondColor = colorTraductor(dates[i].color);
                                    break;
                                case "dual":
                                    //Triple color
                                    $("#" + dates[i].date).css("background", "linear-gradient(135deg, " + firstColor + " 0," + firstColor + " 33%, " + secondColor + " 33%, " + secondColor + " 66%," + colorTraductor(dates[i].color) + " 66%," + colorTraductor(dates[i].color) + " 100%)");
                                    $("#" + dates[i].date).attr("data-color", "triple");
                                    break;
                                case "triple":
                                    //Multicolor
                                    $("#" + dates[i].date).css("background", "linear-gradient(135deg,red,orange,yellow,green,blue,indigo,violet)");
                                    $("#" + dates[i].date).addClass("white-overwrite");
                                    $("#" + dates[i].date).attr("data-color", "multi");
                                    break;
                            }
                        }
                    }
                    //Off dado que si se vuelve a ejecutar monthView(), los event handlers se acumulan y se llaman múltiples veces
                    $("#resetButton").off();
                    $("#resetButton").click(function (event) {
                        if (month != parseInt(moment().format("M")) || year != moment().year()) {
                            $(".progress").show();
                            $.get("./src/funcs/funcs.php?yearChange=" + moment().year() + "&monthChange=" + moment().format("M"), function () {}).done(function () {
                                monthView();
                            });
                        }
                    });
                    //Off dado que si se vuelve a ejecutar monthView(), los event handlers se acumulan y se llaman múltiples veces
                    $("#nextMonthButton").off();
                    $("#nextMonthButton").click(function (event) {
                        if ($(".switch").find("input").prop("checked")) {
                            if (parseInt(month) == 12) {
                                M.toast({
                                    html: 'Año bloqueado'
                                });
                            } else {
                                $.get("./src/funcs/funcs.php?monthChange=" + (parseInt(month) + 1), function () {}).done(function () {
                                    monthView();
                                });
                            }
                        } else {
                            if (parseInt(month) == 12) {
                                $.get("./src/funcs/funcs.php?monthChange=1&yearChange=" + (parseInt(year) + 1), function () {}).done(function () {
                                    monthView();
                                });
                            } else {
                                $.get("./src/funcs/funcs.php?monthChange=" + (parseInt(month) + 1), function () {}).done(function () {
                                    monthView();
                                });
                            }
                        }
                    });
                    //Off dado que si se vuelve a ejecutar monthView(), los event handlers se acumulan y se llaman múltiples veces
                    $("#prevMonthButton").off();
                    $("#prevMonthButton").click(function (event) {
                        if ($(".switch").find("input").prop("checked")) {
                            if (parseInt(month) == 1) {
                                M.toast({
                                    html: 'Año bloqueado'
                                });
                            } else {
                                $.get("./src/funcs/funcs.php?monthChange=" + (parseInt(month) - 1), function () {}).done(function () {
                                    monthView();
                                });
                            }
                        } else {
                            if (parseInt(month) == 1) {
                                $.get("./src/funcs/funcs.php?monthChange=12&yearChange=" + (parseInt(year) - 1), function () {}).done(function () {
                                    monthView();
                                });
                            } else {
                                $.get("./src/funcs/funcs.php?monthChange=" + (parseInt(month) - 1), function () {}).done(function () {
                                    monthView();
                                });
                            }
                        }
                    });

                    $(".month-actual-days").find("span").click(function (event) {
                        event.stopPropagation();
                        var thisDate = moment(parseInt($(this).attr("id")));
                        $("#roundedPreloader").show();
                        $("#daysModal2 .card-reveal").attr("id", "card-day" + $(this).attr("id"));
                        //Si se hace click en un día después de haber desplegado el reveal anteriormente, lo cierra para éste nuevo día clickado
                        if ($("#daysModal2 .card-reveal").attr("style") == "display: block; transform: translateY(-100%);") {
                            $("#closeCardReveal").click();
                        }
                        $("#daysModal2").modal("open");
                        $("#daysModal2").find("#card-title1").text(fullWeekDays[thisDate.weekday()] + " " + thisDate.format("D") + " de " + thisDate.format("MMMM") + " de " + moment(parseInt($(this).attr("id"))).year());
                        $("#daysModal2").find("#card-title2").text(fullWeekDays[thisDate.weekday()] + " " + thisDate.format("D") + " de " + thisDate.format("MMMM") + " de " + moment(parseInt($(this).attr("id"))).year());
                        queryDay($(event.target).attr("id"));
                    });

                    //Off dado que si se vuelve a ejecutar monthView(), los event handlers se acumulan y se llaman múltiples veces
                    $("#monthDropdown").find("a").off()
                    $("#monthDropdown").find("a").click(function (event) {
                        var dropdownMonth = parseInt($(this).attr("id").substr(13, $(this).attr("id").length));
                        if (month != dropdownMonth) {
                            $.get("./src/funcs/funcs.php?monthChange=" + dropdownMonth, function () {}).done(function () {
                                monthView();
                            });
                        }
                    });
                    $(".month-week-row").click(function(event) {
                        $("#roundedPreloader2").show();
                        var thisWeek, thisYear;
                        var count = 0;
                        var count2 = 0;
                        var count3 = 0;
                        var count4 = 0;
                        var count5 = 0;
                        $("#bottomModal").find(".row").text("");
                        if ($(this).find(".month-actual-days").length == 0) {
                            if ($(this).prev().find(".month-actual-days").length == 0) {
                                thisWeek = moment(parseInt($(this).prev().prev().find(".month-actual-days").eq(0).find("span").attr("id"))).week() + 2;
                                thisYear = moment(parseInt($(this).prev().prev().find(".month-actual-days").eq(0).find("span").attr("id"))).year();
                            } else {
                                thisWeek = moment(parseInt($(this).prev().find(".month-actual-days").eq(0).find("span").attr("id"))).week() + 1;
                                thisYear = moment(parseInt($(this).prev().find(".month-actual-days").eq(0).find("span").attr("id"))).year();
                                if (thisWeek > (moment(thisYear).weeksInYear())) {
                                    //Si se cumple es que se está observando la primera semana del año siguiente
                                    thisWeek = 1;
                                    thisYear++;
                                }
                            }
                        } else {
                            thisWeek = moment(parseInt($(this).find(".month-actual-days").eq(0).find("span").attr("id"))).week();
                            thisYear = moment(parseInt($(this).find(".month-actual-days").eq(0).find("span").attr("id"))).year();
                        }
                        if (month == 1 && thisWeek > 15) {
                            thisYear--;
                        }
                        if (month == 12 && thisWeek < 15 && $(this).hasClass("partially-disabled-weeks")) {
                            thisYear++;
                        }
                        $("#bottomModal").find("h4").text("Semana " + thisWeek + " de " + thisYear);
                        for (var i = 0; i < 7; i++) {
                            $("#bottomModal").find(".row").append("<div class='col custom7 fullWeekDays'>" + fullWeekDays[i] + "</div>");
                        }
                        for (var i = 0; i < 7; i++) {
                            if ($(this).find("span").eq(i).attr("id") == undefined) {
                                if (month == 1) {
                                    $("#bottomModal").modal("open");
                                    if (parseInt($(this).children().eq(i).children().text()) > 15) {
                                        $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week days-on-week-disabled'>" + $(this).children().eq(i).children().text() + "</span></div>");
                                    } else {
                                        $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week enabled' id='week-day" + moment($(this).find(".month-next-days").eq(count).text() + "-02-" + year, "DD-MM-YYYY").valueOf() + "'>" + $(this).find(".month-next-days").eq(count).text() + "</span></div>");
                                        count++;
                                    }
                                } else if (month == 12) {
                                    if (parseInt($(this).children().eq(i).children().text()) < 15) {
                                        //Si $(this) es la última semana de diciembre con todo disabled days (con lo cuál será la primera o segunda semana del año siguiente)
                                        if ($(this).hasClass("disabled-weeks")) {
                                            $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week days-on-week-disabled' id='week-day" + moment(parseInt($(this).prev().find("span").eq(0).attr("id"))).add(i + 7, "days").valueOf() + "'>" + $(this).children().eq(i).children().text() + "</span></div>");
                                        } else {
                                            //A la última semana compartida (disabled y enabled) de diciembre se le ponen ids a sus días sumandole días al último dia del año actual
                                            $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week days-on-week-disabled' id='week-day" + moment(parseInt($(this).find("span").eq(0).attr("id"))).add(i, "days").valueOf() + "'>" + $(this).children().eq(i).children().text() + "</span></div>");
                                        }
                                    } else {
                                        $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week enabled' id='week-day" + moment($(this).find(".month-previous-days").eq(count2).text() + "-11-" + year, "DD-MM-YYYY").valueOf() + "'>" + $(this).find(".month-previous-days").eq(count2).text() + "</span></div>");
                                        count2++;
                                    }
                                } else {
                                var actual = $(this);
                                    if ($(this).attr("id").substr(10, $(this).attr("id").length) == "1") {
                                        $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week enabled' id='week-day" + moment($(this).find(".month-previous-days").eq(count3).text() + "-" + (month - 1) + "-" + year, "DD-MM-YYYY").valueOf() + "'>" + $(this).find(".month-previous-days").eq(count3).text() + "</span></div>");
                                        count3++;
                                    } else if ($(this).attr("id").substr(10, $(this).attr("id").length) == "5") {
                                        $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week enabled' id='week-day" + moment($(this).find(".month-next-days").eq(count4).text() + "-" + (month + 1) + "-" + year, "DD-MM-YYYY").valueOf() + "'>" + $(this).find(".month-next-days").eq(count4).text() + "</span></div>");
                                        count4++;
                                    } else {
                                        $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week enabled' id='week-day" + moment($(this).find(".month-next-days").eq(count5).text() + "-" + (month + 1) + "-" + year, "DD-MM-YYYY").valueOf() + "'>" + $(this).find(".month-next-days").eq(count5).text() + "</span></div>");
                                        count5++;
                                    }
                                }
                            } else {
                                $("#bottomModal").find(".row").append("<div class='col custom7'><span class='days-on-week enabled' id='" + "week-day" + $(this).find("span").eq(i).attr("id") + "'>" + $(this).children().eq(i).children().text() + "</span></div>");
                            }
                        }
                        if (month == 1) {
                            for (var i = 0; i < $(this).find(".month-previous-days").length; i++) {
                                $("#bottomModal").find(".days-on-week-disabled").eq(i).attr("id", "week-day" + moment($(this).find(".month-previous-days").eq(i).text() + "-12-" + (year - 1), "DD-MM-YYYY").valueOf());
                            }
                        }
                        $("#bottomModal").find("span").each(function (index, value) {
                            $.get("./src/funcs/funcs.php?queryDay=" + $(this).attr("id").substr(8, $(this).attr("id").length), function () {}).done(function (data) {
                                if (data != "[]") {
                                    var firstColor, secondColor, thirdColor;
                                    for (var i = 0; i < JSON.parse(data).length; i++) {
                                        switch (i) {
                                            case 0:
                                                $("#week-day" + JSON.parse(data)[i].date).css("color", colorTraductor(JSON.parse(data)[0].color));
                                                firstColor = colorTraductor(JSON.parse(data)[0].color);
                                                break;
                                            case 1:
                                                $("#week-day" + JSON.parse(data)[i].date).css("background", "-webkit-linear-gradient(135deg, " + firstColor + " 50%, " + colorTraductor(JSON.parse(data)[i].color) + " 50%)");
                                                $("#week-day" + JSON.parse(data)[i].date).css("-webkit-background-clip", "text");
                                                $("#week-day" + JSON.parse(data)[i].date).css("-webkit-text-fill-color", "transparent");
                                                secondColor = colorTraductor(JSON.parse(data)[i].color);
                                                break;
                                            case 2:
                                                $("#week-day" + JSON.parse(data)[i].date).css("background", "-webkit-linear-gradient(135deg, " + firstColor + " 0," + firstColor + " 33%, " + secondColor + " 33%, " + secondColor + " 66%," + colorTraductor(JSON.parse(data)[i].color) + " 66%," + colorTraductor(JSON.parse(data)[i].color) + " 100%)");
                                                $("#week-day" + JSON.parse(data)[i].date).css("-webkit-background-clip", "text");
                                                $("#week-day" + JSON.parse(data)[i].date).css("-webkit-text-fill-color", "transparent");
                                                thirdColor = colorTraductor(JSON.parse(data)[i].color);
                                                break;
                                            case 3:
                                                $("#week-day" + JSON.parse(data)[i].date).css("background", "-webkit-linear-gradient(135deg,red,orange,yellow,green,blue,indigo,violet)");
                                                $("#week-day" + JSON.parse(data)[i].date).css("-webkit-background-clip", "text");
                                                $("#week-day" + JSON.parse(data)[i].date).css("-webkit-text-fill-color", "transparent");
                                                break;
                                        }
                                    }
                                }
                                $("#roundedPreloader2").fadeOut();
                            });
                        });
                        $(".days-on-week").click(function (event) {
                            $("#bottomModal").modal("close");
                            if ($("#" + $(this).attr("id").substr(8, $(this).attr("id").length)).length > 0) {
                                //$("#" + $(this).attr("id").substr(8, $(this).attr("id").length)).trigger("click");
                                $("#roundedPreloader").show();
                                if ($(this).attr("id").indexOf("week-day") != -1) {
                                    $("#daysModal2 .card-reveal").attr("id", "card-day" + $(this).attr("id").substr(8, $(this).attr("id").length));
                                } else {
                                    $("#daysModal2 .card-reveal").attr("id", "card-day" + $(this).attr("id"));
                                }
                                //Si se hace click en un día después de haber desplegado el reveal anteriormente, lo cierra para éste nuevo día clickado
                                if ($("#daysModal2 .card-reveal").attr("style") == "display: block; transform: translateY(-100%);") {
                                    $("#closeCardReveal").click();
                                }
                                var thisDate = moment(parseInt($(this).attr("id").substr(8, $(this).attr("id").length)));
                                $("#daysModal2").find("#card-title1").text(fullWeekDays[thisDate.weekday()] + " " + thisDate.format("D") + " de " + thisDate.format("MMMM") + " de " + thisDate.year());
                                $("#daysModal2").find("#card-title2").text(fullWeekDays[thisDate.weekday()] + " " + thisDate.format("D") + " de " + thisDate.format("MMMM") + " de " + thisDate.year());
                                queryDay($(this).attr("id").substr(8, $(this).attr("id").length));
                                setTimeout(function() {$("#daysModal2").modal("open");},400);
                            } else {
                                $("#roundedPreloader").show();
                                $("#daysModal2 .card-reveal").attr("id", "card-day" + $(this).attr("id").substr(8, $(this).attr("id").length));
                                //Si se hace click en un día después de haber desplegado el reveal anteriormente, lo cierra para éste nuevo día clickado
                                if ($("#daysModal2 .card-reveal").attr("style") == "display: block; transform: translateY(-100%);") {
                                    $("#closeCardReveal").click();
                                }
                                var thisDate = moment(parseInt($(this).attr("id").substr(8, $(this).attr("id").length)));
                                $("#daysModal2").find("#card-title1").text(fullWeekDays[thisDate.weekday()] + " " + thisDate.format("D") + " de " + thisDate.format("MMMM") + " de " + thisDate.year());
                                $("#daysModal2").find("#card-title2").text(fullWeekDays[thisDate.weekday()] + " " + thisDate.format("D") + " de " + thisDate.format("MMMM") + " de " + thisDate.year());
                                queryDay($(this).attr("id").substr(8, $(this).attr("id").length));
                                setTimeout(function() {$("#daysModal2").modal("open");}, 400);
                            }
                        });
                        $("#bottomModal").modal("open");
                        $("#roundedPreloader2").fadeOut();
                    });
                    $(document).mousemove(function (event) {
                        if (event.ctrlKey) {
                            $(".month-actual-days").find("span").css("pointer-events", "none");
                        } else {
                            $(".month-actual-days").find("span").css("pointer-events", "");
                        }
                    });
                    addPulseHover();
                    $(".progress").fadeOut();
                });
            });
        });
    });
}
function eventsView() {
    $(".progress").fadeIn();
    $("#resetYearButton").fadeOut(200);
    $("#year").fadeOut(200);
    $("#month").fadeOut(200);
    $(".switch").hide();
    $("#monthBlockquote").text("");
    $("#infoFeatureDiscovery").find("div").html("<h5>Consulta los eventos</h5><p>Introduce una fecha desde y una fecha hasta para mostrar los eventos en ése rango de fechas</p>");
    $("title").text("Plainer | Eventos");
    $(".page-footer").remove();
    $(".flex-container.main-calendar").html("");
    $("#eventsView").fadeIn();
    $("#yearBlockquote").html("");
    $("#eventsBlockquote").html("Resultado de la búsqueda:<br/>Pendiente");
    $("footer").append(footer);
    addPulseHover();
    $(".progress").fadeOut();
}
/**********************Views**********************/