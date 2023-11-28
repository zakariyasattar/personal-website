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
  loadAbout();
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

  console.log(terminal_output);
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
  document.getElementById("body").style.background = "#232946";
  document.getElementById("tiny-terminal").style.display = "none";

  var terminal_input = document.getElementsByClassName("terminal-input")[document.getElementsByClassName("terminal-input").length - 1];
  terminal_input.focus();
}

function loadAbout() {
  document.getElementById("normal-nav").style.display = "none";
  document.getElementById("tiny-terminal").style.display = "block";

  document.getElementById("terminal").style.display = "none";
  document.getElementById("about").style.display = "block";

  document.getElementById("body").style.background = "#16161a";

}

function printLS() {
  var terminals = document.getElementsByClassName("terminal-output");
  var output = terminals[terminals.length-1];

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

  output.appendChild(about);
  output.appendChild(interests);
  output.appendChild(projects);
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

