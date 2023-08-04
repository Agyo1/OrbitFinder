const planets = [
  {
    name: "Mercury",
    au: 0.39,
    radius: 2439.5,
  },
  {
    name: "Venus",
    au: 0.72,
    radius: 6052.0,
  },
  {
    name: "Earth",
    au: 1,
    radius: 6378.0,
  },
  {
    name: "Mars",
    au: 1.52,
    radius: 3396.0,
  },
  {
    name: "Jupiter",
    au: 5.2,
    radius: 71492.0,
  },
  {
    name: "Saturn",
    au: 9.54,
    radius: 60268.0,
  },
  {
    name: "Uranus",
    au: 19.2,
    radius: 25559.0,
  },
  {
    name: "Neptune",
    au: 30.06,
    radius: 24764.0,
  },
];

var planetsDropdown = document.getElementById("planetDropdown");

function findPeriod() {
  var planet = planetsDropdown.value;
  var period = keplersThirdLaw(findPlanet(planet).au);
  document.getElementById("au_output").innerHTML =
    "\\(p^2=" + findPlanet(planet).au + "^3\\)";

  document.getElementById("period_output").innerHTML =
    "\\(p=" +
    period + 
    "\\) years";
  document.getElementById("days_output").innerHTML =
    "\\(p=" + period * 365 + "\\) days";
  MathJax.typeset();
}
function findPlanet(planetName) {
  for (let i = 0; i < planets.length; i++) {
    if (planets[i].name == planetName) {
      return planets[i];
    }
  }
}
function findPeriodToPlanet() {
  var departPlanet = departureDropdown.value;
  var arrivalPlanet = arrivalDropdown.value;

  var r_1 = findPlanet(departPlanet).au;
  var r_2 = findPlanet(arrivalPlanet).au;

  var semiMajorAxis = (r_1 + r_2) / 2;
  var period = keplersThirdLaw(semiMajorAxis);
  var timeToPlanet = period/2;

  document.getElementById("inputtedAU").innerHTML = "$$A=\\frac{" + r_1 + "+" + r_2 + "}{2}$$";
  document.getElementById("outputAU").innerHTML = "$$A=" + semiMajorAxis + "$$";
  document.getElementById('keplerAU').innerHTML = "$$p=" + period + "$$";
  document.getElementById('tOutput').innerHTML = "$$T=\\frac{" + period + "}{2}$$";
  document.getElementById('tFinal').innerHTML = "\\(T=" + timeToPlanet + "\\)" + " years to go from " + departPlanet + " to " + arrivalPlanet;

  MathJax.typeset();
}


function findLeaveAngle() {
  var departurePlanet = angleDepartureDropdown.value;
  var arrivalPlanet = angleArrivalDropdown.value;

  var t = (keplersThirdLaw(semiMajorAxis(departurePlanet, arrivalPlanet)) / 2);
  var p = keplersThirdLaw(findPlanet(arrivalPlanet).au);

  let angle = leaveAngle(t, p);

  document.getElementById("equation_plugged_in").innerHTML = "$$\\frac{" + t + "}{" + p + "}=\\frac{(180-\\theta)}{360}$$";
  document.getElementById("phase_angle_output").innerHTML = "$$\\theta=" + angle + "90^{\\circ}$$";

  MathJax.typeset();
}
function leaveAngle(T, p) {
  return (((360 * T)-(p*180))/p) * -1;
}

function startPage() {
  findPeriod();
  findPeriodToPlanet();
  findLeaveAngle();
}
function keplersThirdLaw(a) {
  return Math.sqrt(Math.pow(a, 3));
}
function semiMajorAxis(p1, p2) {
  return (findPlanet(p1).au + findPlanet(p2).au) / 2;
}