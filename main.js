window.onload = function() {
  initTerm();

  const icnMenu = document.querySelector('.menu-icon');
  icnMenu.addEventListener('click', () => {
    toggleNav();
  });
};

function initTerm() {
  var terminals = document.getElementsByClassName("terminal-input");
  var terminal_input = terminals[terminals.length - 1];
  terminal_input.focus();

  document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      if(document.activeElement === terminal_input) {
        if(terminal_input.value != "") {
          evalCommand(terminal_input.value);
          generateTerminal();
          terminal_input.disabled = true;
        }
      }
    }
  });

  document.addEventListener("keydown", function(event) {
    console.log("hello");
    if(document.getElementById("projects").style.display != "none") {
      if (event.key === "ArrowRight") {
        plusSlides(1);
      }
      else if (event.key === "ArrowLeft") {
        plusSlides(-1);
      }
    }
  });

  loadProjects();
  returnToTerminal();
  loadProjects();
}

function evalCommand(command) {
  var commands = ['ls', 'cd', 'about', 'interests', 'projects', 'clear'];

  command = command.replace(" ", "");

  if(commands.includes(command)) {
    if(command == "ls") {
      printLS();
    }
    if(command == "about") {
      loadAbout();
    }
    if(command == "projects") {
      loadProjects();

      // I would fix but ig im lazy??
      returnToTerminal();
      loadProjects();
    }
    if(command == "interests") {
      loadInterests();
    }

    if(command == 'clear') {
      clearTerm();
    }
  }
  else {
    invalidCommand();
  }
}

function invalidCommand() {
  var terminals = document.getElementsByClassName("terminal-output");
  var terminal_output = terminals[terminals.length - 1];

  var error_msg = document.createElement('span');
  error_msg.innerHTML = "Sorry, that command doesn't exist!";
  error_msg.style.color = "#FF7F50";
  error_msg.style.fontSize = "15px";

  terminal_output.appendChild(error_msg);
}

function clearTerm() {
  var terminals = document.getElementsByClassName('terminal-parent');

  for(var term of terminals) {
        term.remove();
  }

  generateTerminal();
}

function generateTerminal() {
  var term_parent = document.createElement('div');
  term_parent.className = "terminal-parent";
  var terminal = document.createElement('div');
  terminal.className = "terminal";
  var text = document.createTextNode("users/zakariyasattar/portfolio ~");
  var input = document.createElement('input');
  input.type = "text";
  input.className = "terminal-input";
  input.placeholder = "type 'ls'";

  var output = document.createElement('div');
  output.className = "terminal-output";

  terminal.appendChild(text);
  terminal.appendChild(document.createTextNode("\u00A0"));
  terminal.appendChild(input);
  term_parent.appendChild(terminal);
  term_parent.appendChild(output);

  document.getElementById('terminal').appendChild(term_parent);

  input.focus();

  initTerm();

}

function returnToTerminal() {
  document.getElementById("about").style.display = "none";
  document.getElementById("projects").style.display = "none";
  document.getElementById("bonus").style.display = "none";

  document.getElementById("terminal").style.display = "block";
  document.getElementById("normal-nav").style.display = "block";
  document.getElementById("body").style.background = "#232946";
  document.getElementById("tiny-terminal").style.display = "none";

  var terminal_input = document.getElementsByClassName("terminal-input")[document.getElementsByClassName("terminal-input").length - 1];
  terminal_input.focus();
}

function loadAbout() {
  var terminals = document.getElementsByClassName("terminal-output");
  var terminal_output = terminals[terminals.length - 1];

  var msg = document.createElement('span');
  msg.innerHTML = "Mapping to About...";
  msg.style.color = "#59ff50";
  msg.style.fontSize = "15px";

  terminal_output.appendChild(msg);

  document.getElementById("normal-nav").style.display = "none";
  document.getElementById("tiny-terminal").style.display = "block";

  document.getElementById("terminal").style.display = "none";
  document.getElementById("about").style.display = "block";
  document.getElementById("about").style.opacity = "1";

  document.getElementById("body").style.background = "#16161a";

}

let slideIndex = 1;

function loadProjects() {
  var terminals = document.getElementsByClassName("terminal-output");
  var terminal_output = terminals[terminals.length - 1];

  var msg = document.createElement('span');
  msg.innerHTML = "Mapping to Projects...";
  msg.style.color = "#59ff50";
  msg.style.fontSize = "15px";

  terminal_output.appendChild(msg);

  document.getElementById("normal-nav").style.display = "none";
  document.getElementById("tiny-terminal").style.display = "block";

  document.getElementById("terminal").style.display = "none";
  document.getElementById("projects").style.display = "block";
  document.getElementById("projects").style.opacity = "1";

  document.getElementById("body").style.background = "#abd1c6";

  showSlides(slideIndex);
}

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  var slides = document.getElementsByClassName("project");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex-1].style.display = "block";
}

function printLS() {
  var terminals = document.getElementsByClassName("terminal-output");
  var output = terminals[terminals.length-1];

  var instructions = document.createElement('span');
  instructions.className = "ls";
  instructions.innerHTML = "type in any of the commands below!";
  instructions.style.color = "royalblue";

  var about = document.createElement('span');
  about.className = "ls";
  about.textContent = "about";

  var interests = document.createElement('span');
  interests.className = "ls";
  interests.textContent = "interests";

  var projects = document.createElement('span');
  projects.className = "ls";
  projects.textContent = "projects";

  var cd_into = document.createElement('span');
  cd_into.className = "ls";
  cd_into.textContent = 'cd_into_me';
  var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0");
  cd_into.appendChild(tabNode);
  cd_into.textContent += "type: folder";

  output.appendChild(instructions);
  output.appendChild(about);
  output.appendChild(projects);
  output.appendChild(interests);
  output.appendChild(cd_into);
}

function toggleNav() {
  var nav = document.getElementById('nav');
  if(nav.style.opacity == "0") {
    nav.style.opacity = "1";
  }
  else {
    nav.style.opacity = "0";
  }
}

