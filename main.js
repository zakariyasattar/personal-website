window.onload = function() {
  initTerm();
  sessionStorage.clear();
  sessionStorage.setItem("lastDir", "portfolio");

  // loadBonus();
  // loadProjects();
  // loadAbout();
};

function initTerm() {
  var terminals = document.getElementsByClassName("terminal-input");
  var terminal_input = terminals[terminals.length - 1];
  terminal_input.focus();

  $(terminal_input).keydown(function(e) {
    if (e.keyCode == 9) {
      if(terminal_input.value != ""){
        autocomplete(terminal_input);
      }
      e.preventDefault();
    }
  });

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
    if(document.getElementById("projects").style.display != "none") {
      if (event.key === "ArrowRight") {
        plusSlides(1);
      }
      else if (event.key === "ArrowLeft") {
        plusSlides(-1);
      }
    }
  });
  document.onclick = function() { terminal_input.focus(); };
}

function autocomplete(term_input) {
  currentStr = term_input.value;
  var commands = ['ls', 'about', 'projects', 'clear', 'resume', 'bonus', 'links'];

  for(var command in commands) {
    if(commands[command].indexOf(currentStr) == 0){
      term_input.value = commands[command];
    }
  }

  if(currentStr.substring(0, 2) == "cd") {
    var lastDir = sessionStorage.getItem("lastDir");
    currentStr = currentStr.substring(3);
    if(lastDir == "portfolio" && "cd_into_me".indexOf(currentStr) == 0){
      term_input.value = "cd cd_into_me";
    }
    else if(lastDir == "zakariyasattar" && "portfolio".indexOf(currentStr) == 0){
      term_input.value = "cd portfolio";
    }
  }
}

function evalCommand(command) {
  var commands = ['ls', 'about', 'projects', 'clear', 'resume', 'bonus', 'cd_into_me', 'links'];

  command = command.replace(" ", "");
  command = command.toLowerCase();

  if(command.substring(0, 2) == "cd" || commands.includes(command)) {
    if(command == "ls") {
      printLS();
    }
    if(command == "about") {
      loadAbout(true);
    }
    if(command == "projects") {
      loadProjects(true);

      // I would fix but ig im lazy??
      returnToTerminal();
      loadProjects(false);
    }
    if(command == "resume") {
      downloadResume();
    }

    if(command == "cd_into_me") {
      cdError();
    }

    if(command == "clear") {
      clearTerm();
    }

    if(command == "links") {
      printLinks();
    }

    if(command == "bonus" && sessionStorage.getItem("lastDir") == "zakariyasattar") {
      loadBonus(true);
    }

    if(command.substring(0, 2) == "cd") {
      var directory = command.substring(2);

      if(command.charAt(2) != '_') {
        routeToDir(directory);
      }
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
  error_msg.style.fontFamily = "monospace";
  error_msg.innerHTML = "Sorry, that command doesn't exist!";
  error_msg.style.color = "#FF7F50";
  error_msg.style.fontSize = "15px";

  terminal_output.appendChild(error_msg);
}

function printLinks() {
  var terminals = document.getElementsByClassName("terminal-output");
  var terminal_output = terminals[terminals.length - 1];

  var description = document.createElement('span');
  description.innerHTML = "Follow/connect with me through these mediums:";
  description.style.color = "#FFFDD0";
  description.style.fontFamily = "monospace";
  description.style.paddingBottom = "10px";
  description.className = "ls";

  var linkedin = document.createElement('a');
  linkedin.innerHTML = "https://www.linkedin.com/in/zakariyasattar/";
  linkedin.href = "https://www.linkedin.com/in/zakariyasattar/";
  linkedin.className = "links";

  var github = document.createElement('a');
  github.innerHTML = "https://github.com/zakariyasattar";
  github.href = "https://github.com/zakariyasattar";
  github.className = "links";

  var email = document.createElement('a');
  email.innerHTML = "zakariyasattar03@gmail.com";
  email.href = "mailto:zakariyasattar03@gmail.com";
  email.className = "links-last";

  terminal_output.appendChild(description);
  terminal_output.appendChild(linkedin);
  terminal_output.appendChild(github);
  terminal_output.appendChild(email);
}

function cdError() {
  var terminals = document.getElementsByClassName("terminal-output");
  var terminal_output = terminals[terminals.length - 1];

  var error_msg = document.createElement('span');
  error_msg.style.fontFamily = "monospace";
  error_msg.innerHTML = "'cd_into_me' is a folder! Did you perhaps mean 'cd cd_into_me'?";
  error_msg.style.color = "#FF7F50";
  error_msg.style.fontSize = "15px";

  terminal_output.appendChild(error_msg);
}

function clearTerm() {
  var terminals = document.getElementsByClassName('terminal-parent');

  for(var term of terminals) {
    term.remove();
  }

  if(document.getElementsByClassName('terminal-parent').length > 0) {
    clearTerm();
  }
}

function generateTerminal() {
  var term_parent = document.createElement('div');
  term_parent.className = "terminal-parent";
  var terminal = document.createElement('div');
  terminal.className = "terminal";


  var text = document.createElement("span");
  if(sessionStorage.getItem("lastDir") == "zakariyasattar") {
    text.innerHTML = "users/zakariyasattar ~";
  }
  else if(sessionStorage.getItem("lastDir") == "portfolio"){
    text.innerHTML = "users/zakariyasattar/" + sessionStorage.getItem("lastDir") + " ~";
  }
  else if(sessionStorage.getItem("lastDir") == "cd_into_me"){
    text.innerHTML = "users/zakariyasattar/portfolio/" + sessionStorage.getItem("lastDir") + " ~";
  }

  text.className = "term-text";


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
  if(document.getElementById("bonus") != "none") {
    document.getElementById("tiny-terminal").style.position = "absolute";
    document.getElementById("tiny-terminal").style.paddingTop = "0px";
    document.getElementById("tiny-terminal").style.paddingBottom = "0px";
  }
  document.getElementById("about").style.display = "none";
  document.getElementById("projects").style.display = "none";
  document.getElementById("bonus").style.display = "none";

  document.getElementById("terminal").style.display = "block";
  document.getElementById("body").style.background = "#232946";
  document.getElementById("tiny-terminal").style.display = "none";

  var terminal_input = document.getElementsByClassName("terminal-input")[document.getElementsByClassName("terminal-input").length - 1];
  terminal_input.focus();
}

function routeToDir(directory) {

  if(directory == "cd_into_me" || directory == "portfolio") {
      setTimeout(function(){
        var term_text = document.getElementsByClassName("term-text")[document.getElementsByClassName("term-text").length - 1];
        var text = term_text.innerHTML;

        term_text.innerHTML = text.substring(0, text.indexOf("~") - 1) +  "/" + directory + " ~";
        sessionStorage.setItem("lastDir", term_text.innerHTML.substring(term_text.innerHTML.lastIndexOf("/") + 1, term_text.innerHTML.indexOf("~") -1));
      }, 40);
    }
    else if(directory == "..") {
      setTimeout(function(){
        if(sessionStorage.getItem("lastDir") != "zakariyasattar"){
          sessionStorage.clear();
          var term_text = document.getElementsByClassName("term-text")[document.getElementsByClassName("term-text").length - 1];
          text = term_text.innerHTML;

          term_text.innerHTML = text.substring(0, text.lastIndexOf("/")) + " ~";

          sessionStorage.setItem("lastDir", term_text.innerHTML.substring(term_text.innerHTML.lastIndexOf("/") + 1, term_text.innerHTML.indexOf("~") -1));
        }
      }, 40);
    }
    else {
      var terminals = document.getElementsByClassName("terminal-output");
      var terminal_output = terminals[terminals.length - 1];

      var msg = document.createElement('span');
      msg.innerHTML = "Directory '" + directory + "' doesn't exist!";
      msg.style.color = "#FF7F50";
      msg.style.fontSize = "15px";
      msg.style.fontFamily = "monospace";

      if(directory == "about" || directory == "projects" || directory == "resume") {
        if(directory == "about") {
          loadAbout(true);
        }
        else if(directory == "projects") {
          loadProjects(true);
        }
        else if(directory == "resume") {
          downloadResume(true);
        }
      }
      else {
        terminal_output.appendChild(msg);
      }
    }
}

function downloadResume(shouldPrint) {
  var terminals = document.getElementsByClassName("terminal-output");
  var terminal_output = terminals[terminals.length - 1];

  var msg = document.createElement('span');
  if(shouldPrint) {
    msg.innerHTML = "Opening Resume...";
    msg.style.color = "#52e349";
    msg.style.fontSize = "15px";
    msg.style.fontFamily = "monospace";
  }

  terminal_output.appendChild(msg);

  window.open('ZakariyaSattarResume.pdf', '_blank');
}

function loadAbout(shouldPrint) {
  var terminals = document.getElementsByClassName("terminal-output");
  var terminal_output = terminals[terminals.length - 1];

  var msg = document.createElement('span');
  if(shouldPrint) {
    msg.innerHTML = "Mapping to About...";
    msg.style.color = "#52e349";
    msg.style.fontSize = "15px";
    msg.style.fontFamily = "monospace";
  }

  terminal_output.appendChild(msg);

  document.getElementById("tiny-terminal").style.display = "block";

  document.getElementById("terminal").style.display = "none";
  document.getElementById("projects").style.display = "none";
  document.getElementById("about").style.display = "block";
  document.getElementById("about").style.opacity = "1";

  document.getElementById("body").style.background = "#16161a";

  if(window.screen.width <= 500) {
    document.getElementById("tiny-terminal").style.display = "none";
    window.addEventListener('scroll', function() {
      if(window.scrollY > window.screen.height/10) {
          document.getElementById("tiny-terminal").style.display = "block";
      }
    });
  }

}

let slideIndex = 1;

function loadProjects(shouldPrint) {
  var terminals = document.getElementsByClassName("terminal-output");
  var terminal_output = terminals[terminals.length - 1];

  var msg = document.createElement('span');
  if(shouldPrint) {
    msg.innerHTML = "Mapping to Projects...";
    msg.style.color = "#52e349";
    msg.style.fontSize = "15px";
    msg.style.fontFamily = "monospace";
  }

  terminal_output.appendChild(msg);

  document.getElementById("tiny-terminal").style.display = "block";

  document.getElementById("terminal").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.getElementById("projects").style.display = "block";
  document.getElementById("projects").style.opacity = "1";

  document.getElementById("body").style.background = "#211f33";

  showSlides(slideIndex);
}

function loadBonus(shouldPrint) {
  var terminals = document.getElementsByClassName("terminal-output");
  var terminal_output = terminals[terminals.length - 1];

  var msg = document.createElement('span');
  if(shouldPrint) {
    msg.innerHTML = "Mapping to Bonus...";
    msg.style.color = "#52e349";
    msg.style.fontSize = "15px";
    msg.style.fontFamily = "monospace";
  }

  terminal_output.appendChild(msg);

  document.getElementById("tiny-terminal").style.display = "block";

  document.getElementById("tiny-terminal").style.position = "sticky";
  document.getElementById("tiny-terminal").style.paddingTop = "5px";
  document.getElementById("tiny-terminal").style.paddingBottom = "5px";

  document.getElementById("terminal").style.display = "none";
  document.getElementById("bonus").style.display = "block";
  document.getElementById("bonus").style.opacity = "1";

  document.getElementById("body").style.background = "#f2f7f5";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var fileContent = this.responseText;
        fileContent = fileContent.replace(/\n/g, "</br>");
        fileContent = fileContent.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
        document.getElementById("story-text").innerHTML = fileContent;
      }
  };

  xhttp.open("GET", "ethiopia.txt", true);
  xhttp.send();
}

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

  if(sessionStorage.getItem("lastDir") == "portfolio") {

    var instructions = document.createElement('span');
    instructions.className = "ls";
    instructions.innerHTML = "type in/click on any of the commands below!";
    instructions.style.color = "#FFFDD0";
    instructions.style.paddingBottom = "10px";

    var about = document.createElement('span');

    $(about).click(function(){
      loadAbout(false);
    });
    about.style.textDecoration = "underline";
    about.style.cursor = "pointer";

    about.className = "ls";
    about.textContent = "about";

    var projects = document.createElement('span');

    $(projects).click(function(){
      loadProjects(false);
    });
    projects.style.textDecoration = "underline";
    projects.style.cursor = "pointer";

    projects.className = "ls";
    projects.textContent = "projects";

    var resume = document.createElement('span');

    $(resume).click(function(){
      downloadResume(false);
    });
    resume.style.textDecoration = "underline";
    resume.style.cursor = "pointer";

    resume.className = "ls";
    resume.textContent = "resume";

    var links = document.createElement('span');
    $(links).click(function(){
      printLinks();
      generateTerminal();
    });
    links.style.textDecoration = "underline";
    links.style.cursor = "pointer";

    links.className = "ls";
    links.textContent = "links";

    var cd_into = document.createElement('span');
    cd_into.className = "ls";
    cd_into.textContent = 'cd_into_me';

    var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0");
    cd_into.appendChild(tabNode);
    cd_into.textContent += "type: folder";

    output.appendChild(instructions);
    output.appendChild(about);
    output.appendChild(projects);
    output.appendChild(resume);
    output.appendChild(links);
    output.appendChild(cd_into);
  }
  else if(sessionStorage.getItem("lastDir") == "cd_into_me") {
    var terminals = document.getElementsByClassName("terminal-output");
    var terminal_output = terminals[terminals.length - 1];

    var msg = document.createElement('span');
    msg.innerHTML ="Hmmm, it looks like this directory is empty... It is cool though how ALL the features of the cd command are implemented. Try returning to the main directory. I wonder how far back it goes...";
    msg.style.color = "royalblue";
    msg.style.fontSize = "15px";
    terminal_output.appendChild(msg);
  }
  else if(sessionStorage.getItem("lastDir") == "zakariyasattar") {
    var instructions = document.createElement('span');
    instructions.className = "ls";
    instructions.innerHTML = "type in/click on any of the commands below!";
    instructions.style.color = "#FFFDD0";

    var bonus = document.createElement('span');

    $(bonus).click(function(){
      loadBonus(false);
    });
    bonus.style.textDecoration = "underline";
    bonus.style.cursor = "pointer";

    bonus.className = "ls";
    bonus.textContent = "bonus";

    var portfolio = document.createElement('span');
    portfolio.className = "ls";
    portfolio.textContent = 'portfolio';

    var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0");
    portfolio.appendChild(tabNode);
    portfolio.textContent += "type: folder";


    output.appendChild(instructions);
    output.appendChild(bonus);
    output.appendChild(portfolio);
  }
}
