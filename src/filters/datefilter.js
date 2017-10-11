import Vue from "vue";
import fecha from "fecha";

Vue.filter("dateFormat", function (val, pattern = "YYYY-MM-DD HH:mm:ss") {
  val = val || "2016-05-21 08:00:00";
  return fecha.format(new Date(val), pattern);
});