document.addEventListener('DOMContentLoaded', function() {
  const mapContainer = document.getElementById('world-map');
  const landNaamElement = document.getElementById('land-naam');
  const closeButton = document.getElementById('close-button');
  const overlayMenu = document.querySelectorAll('.category');
  const quizButton = document.querySelector('.quiz-button');
  let _startX = 0,
    _startY = 0,
    _scrollTop = 0,
    _scrollLeft = 0;
  let isOverlayOpen = false; // Variabele om bij te houden of de overlay open is

  document.onmousedown = OnMouseDown;
  document.onmouseup = OnMouseUp;

  const questions = [
    {
      question: 'Wat is de hoofdstad van Duitsland?',
      answers: ['Berlijn', 'Parijs', 'Londen', 'Rome'],
      correctAnswer: 'Berlijn'
    },
    {
      question: 'Wat is de grootste stad van Duitsland?',
      answers: ['Berlijn', 'Hamburg', 'München', 'Keulen'],
      correctAnswer: 'Berlijn'
    },
    {
      question: 'Hoeveel deelstaten heeft Duitsland?',
      answers: ['12', '16', '20', '25'],
      correctAnswer: '16'
    }
  ];

  const articles = {
    'Hoofdstad': {
      title: 'De hoofdstad van Duitsland is Berlijn.',
      intro: 'Met 3.866.385 inwoners is Berlijn de grootste stad van het land. Daarnaast is Berlijn - gerekend naar inwonertal binnen de stadsgrenzen - de grootste stad van de Europese Unie.',
      body: `
        Welkom in Berlijn, de levendige hoofdstad van Duitsland waar geschiedenis, cultuur en moderniteit samenkomen voor een onvergetelijke ervaring. Stap binnen in een stad die barst van de mogelijkheden en waar elke hoek wacht om ontdekt te worden.
        <br><br>
        Berlijn is doordrenkt van geschiedenis, met bezienswaardigheden die getuigen van haar bewogen verleden. Wist je dat de stad meer dan 170 musea telt, waaronder het wereldberoemde Pergamonmuseum? En dat de Berlijnse Muur, die ooit de stad verdeelde, nu een galerij is voor kleurrijke street art en een aangrijpend symbool van eenheid?
        <br><br>
        Ontdek de indrukwekkende Brandenburger Tor, bezoek het Holocaust-monument en maak een wandeling door de historische wijk Nikolaiviertel om een glimp op te vangen van het verleden. Maar Berlijn is niet alleen een stad van geschiedenis; het is ook een bruisende culturele hub. Verken de diverse buurten, zoals Kreuzberg en Friedrichshain, waar kunstgalerijen, hippe cafés en vintage winkels elkaar afwisselen.
        <br><br>
        Geniet van de internationale keuken in de levendige markthallen of proef traditionele Duitse gerechten in een gezellige biergarten. Voor degenen die van groen houden, biedt Berlijn talloze parken en groene ruimtes om te verkennen. Het uitgestrekte Tiergarten Park is perfect voor een ontspannen picknick, terwijl het prachtige Tempelhofer Feld, eens een vliegveld, nu een populaire plek is om te wandelen, fietsen en zelfs te barbecueën.
        <br><br>
        En laten we het nachtleven niet vergeten! Berlijn staat bekend om zijn legendarische feestscene, met clubs die de hele nacht doorgaan en een eindeloze reeks bars en pubs om te verkennen. Met meer dan 7000 restaurants en eetgelegenheden is er ook geen tekort aan culinaire hoogstandjes om van te genieten.
        <br><br>
        Berlijn wacht op je met open armen en een eindeloze lijst van dingen om te zien en te doen. Dus waar wacht je nog op? Pak je koffers en ontdek alles wat deze prachtige stad te bieden heeft!
      `
    },
    'Bevolking': {
      title: 'Bevolking van Duitsland.',
      intro: 'Duitsland heeft een bevolking van ongeveer 83 miljoen mensen, waarmee het het op één na meest bevolkte land van Europa is.',
      body: `
        Maak kennis met de fascinerende bevolking van Duitsland, een land dat bekend staat om zijn rijke geschiedenis, culturele diversiteit en moderne samenleving. Met meer dan 83 miljoen inwoners is Duitsland het meest bevolkte land van de Europese Unie en een smeltkroes van verschillende achtergronden en tradities.
        <br><br>
        De Duitse bevolking is trots op haar diversiteit en gastvrijheid, en staat open voor mensen van over de hele wereld. Van de bruisende metropolen tot de idyllische plattelandsdorpen, elke regio van Duitsland heeft zijn eigen unieke charme en karakter.
        <br><br>
        Duitsland heeft een lange geschiedenis van migratie, wat heeft bijgedragen aan de culturele verscheidenheid van het land. Turkse, Poolse, Italiaanse en Griekse gemeenschappen zijn slechts enkele van de vele etnische groepen die hun stempel hebben gedrukt op de Duitse samenleving.
        <br><br>
        De bevolking van Duitsland staat ook bekend om haar hoge opleidingsniveau en technologische innovatie. Duitsland is een wereldleider op het gebied van wetenschap, technologie en engineering, en trekt getalenteerde mensen van over de hele wereld aan.
        <br><br>
        Maar het zijn niet alleen de cijfers en prestaties die de Duitse bevolking zo bijzonder maken. Het zijn ook de kleine dingen, zoals de liefde voor goed eten, bier en gezelligheid, die de Duitse cultuur zo warm en gastvrij maken.
        <br><br>
        Kortom, de bevolking van Duitsland is een levendige mix van traditie en moderniteit, van historische achtergronden en toekomstgerichte denkwijzen. Of je nu een liefhebber bent van geschiedenis, cultuur, natuur of technologie, Duitsland heeft voor ieder wat wils.
      `
    },
    'Landschap': {
      title: 'Landschap van Duitsland.',
      intro: 'Duitsland heeft een gevarieerd landschap, met bergen in het zuiden en bossen, rivieren en meren die het land doorkruisen.',
      body: `
        Verlies jezelf in de adembenemende landschappen van Duitsland, een land dat wordt gekenmerkt door zijn diverse natuurlijke schoonheid, van uitgestrekte bossen en glooiende heuvels tot majestueuze bergen en schilderachtige rivierdalen.
        <br><br>
        In het westen van Duitsland strekken de uitgestrekte bossen van het Zwarte Woud zich uit, bekend om zijn dichte sparrenbossen, schilderachtige meren en charmante dorpjes. Maak een wandeling door de kronkelende paden, geniet van het uitzicht vanaf de toppen van de bergen, of ontspan aan de oevers van een rustig meer.
        <br><br>
        In het zuiden van Duitsland rijzen de indrukwekkende Alpen op, met hun besneeuwde pieken en adembenemende berglandschappen. Hier vind je enkele van de beste skigebieden van Europa, evenals talloze wandel- en fietsroutes voor liefhebbers van outdooractiviteiten.
        <br><br>
        Centraal-Duitsland wordt gedomineerd door de schilderachtige Rijnvallei, met zijn steile wijngaarden, middeleeuwse kastelen en pittoreske stadjes. Vaar langs de rivier op een traditionele Rijnboot, verken de historische stadjes langs de oever, of proef de lokale wijnen tijdens een rondleiding door een wijngaard.
        <br><br>
        In het noorden van Duitsland strekken uitgestrekte vlaktes zich uit, doorsneden door kronkelende rivieren en bezaaid met schilderachtige dorpjes en historische steden. Ontdek de uitgestrekte kustlijn van de Oostzee, met zijn brede zandstranden en rustige baaien, of verken de uitgestrekte heidevelden en bossen van de Lüneburger Heide.
        <br><br>
        Kortom, het landschap van Duitsland is net zo gevarieerd als het land zelf, met voor elk wat wils. Of je nu houdt van bergen, bossen, rivieren of kusten, Duitsland heeft een overvloed aan natuurlijke schoonheid om van te genieten.
      `
    },
    'Cultuur': {
      title: 'Cultuur van Duitsland.',
      intro: 'Duitsland staat bekend om zijn rijke culturele erfgoed, waaronder literatuur, muziek, kunst en architectuur.',
      body: `
        Ontdek de bruisende wereld van de Duitse cultuur, een levendige mengelmoes van kunst, muziek, literatuur en traditie die diep geworteld is in de geschiedenis en het dagelijks leven van het land.
        <br><br>
        Duitsland staat bekend om zijn rijke culturele erfgoed, dat zich uitstrekt van de middeleeuwen tot het heden. Wandel door de geplaveide straten van historische steden zoals Berlijn, München en Keulen en bewonder de prachtige architectuur van eeuwenoude kerken, kastelen en paleizen die getuigen van een glorierijk verleden.
        <br><br>
        Maar de Duitse cultuur leeft niet alleen in monumentale gebouwen; ze komt ook tot uiting in de kunst en creativiteit van haar mensen. Duitsland heeft een bloeiende kunstscene, met een scala aan galerijen en kunstinstellingen die een mix van traditionele en hedendaagse werken tentoonstellen. Van klassieke meesterwerken tot experimentele moderne kunst, er is voor elk wat wils.
        <br><br>
        Muziek vormt een integraal onderdeel van de Duitse cultuur, met componisten als Bach, Beethoven en Wagner die wereldwijd worden vereerd. Laat je betoveren door de tijdloze melodieën en meeslepende uitvoeringen in een van de vele concertzalen of operahuizen in het hele land.
        <br><br>
        Maar misschien wel het meest kenmerkende aspect van de Duitse cultuur is de warmte en gastvrijheid van haar mensen. Geniet van de gezelligheid van een traditionele Biergarten, proef de lokale gerechten en specialiteiten, en deel verhalen en lachen met vrienden en vreemden.
        <br><br>
        Kortom, de cultuur van Duitsland is een rijke en gevarieerde lappendeken van kunst, muziek, traditie en gastvrijheid. Of je nu een liefhebber bent van geschiedenis, kunst, muziek of gewoon wilt genieten van de gezellige sfeer, Duitsland heeft voor ieder wat wils.
      `
    }
  };

  function OnMouseDown(event) {
    if (!isOverlayOpen) { // Controleren of de overlay open is voordat het slepen begint
      document.onmousemove = OnMouseMove;
      _startX = event.clientX;
      _startY = event.clientY;
      _scrollTop = document.documentElement.scrollTop;
      _scrollLeft = document.documentElement.scrollLeft;
    }
  }

  function OnMouseMove(event) {
    window.scrollTo({
      left: _scrollLeft + (_startX - event.clientX),
      top: _scrollTop + (_startY - event.clientY)
    });
  }

  function OnMouseUp() {
    document.onmousemove = null;
  }

  quizButton.addEventListener('click', function() {
    showQuizOverlay();
  });

  function showQuizOverlay() {
    const quizOverlay = document.createElement('div');
    quizOverlay.classList.add('overlay');

    const overlayContent = document.createElement('div');
    overlayContent.classList.add('quiz-overlay-content');
    quizOverlay.appendChild(overlayContent);

    const quizQuestion = document.createElement('h2');
    quizQuestion.textContent = 'Vraag 1: ' + questions[0].question;
    overlayContent.appendChild(quizQuestion);

    const answers = questions[0].answers;

    answers.forEach(answer => {
      const answerButton = document.createElement('button');
      answerButton.textContent = answer;
      answerButton.classList.add('quiz-answer');
      overlayContent.appendChild(answerButton);

      answerButton.addEventListener('click', function() {
        const correctAnswer = questions[0].correctAnswer;
        if (answer === correctAnswer) {
          answerButton.classList.add('correct-answer');
          addNextQuestionButton(overlayContent);
        } else {
          answerButton.classList.add('incorrect-answer');
        }

        const answerStatus = overlayContent.querySelector('.answer-status');
        if (!answerStatus) {
          const newAnswerStatus = document.createElement('p');
          newAnswerStatus.classList.add('answer-status');
          overlayContent.appendChild(newAnswerStatus);
        }

        const existingAnswerStatus = overlayContent.querySelector('.answer-status');
        existingAnswerStatus.textContent = answer === correctAnswer ? 'Goed!' : 'Fout!';
      });
    });

    const closeButtonClone = closeButton.cloneNode(true);
    overlayContent.appendChild(closeButtonClone);

    document.body.appendChild(quizOverlay);

    quizOverlay.style.display = 'block';

    closeButtonClone.addEventListener('click', function() {
      document.body.removeChild(quizOverlay);
    });
  }

  function addNextQuestionButton(overlayContent) {
    const nextQuestionButton = document.createElement('button');
    nextQuestionButton.textContent = 'Volgende vraag';
    nextQuestionButton.classList.add('next-question-button');
    overlayContent.appendChild(nextQuestionButton);

    nextQuestionButton.addEventListener('click', function() {
      goToNextQuestion(overlayContent);
    });
  }

  function goToNextQuestion(overlayContent) {
    overlayContent.querySelectorAll('.quiz-answer').forEach(answerButton => {
      answerButton.remove();
    });

    overlayContent.querySelector('.answer-status').remove();
    overlayContent.querySelector('.next-question-button').remove();

    const currentQuestionIndex = parseInt(overlayContent.querySelector('h2').textContent.split(':')[0].split(' ')[1]) - 1;
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      const nextQuestion = questions[nextQuestionIndex];
      const quizQuestion = overlayContent.querySelector('h2');
      quizQuestion.textContent = `Vraag ${nextQuestionIndex + 1}: ${nextQuestion.question}`;

      const answers = nextQuestion.answers;

      answers.forEach(answer => {
        const answerButton = document.createElement('button');
        answerButton.textContent = answer;
        answerButton.classList.add('quiz-answer');
        overlayContent.appendChild(answerButton);

        answerButton.addEventListener('click', function () {
          const correctAnswer = nextQuestion.correctAnswer;
          if (answer === correctAnswer) {
            answerButton.classList.add('correct-answer');
            if (nextQuestionIndex + 1 < questions.length) {
              addNextQuestionButton(overlayContent);
            } else {
              const congratsText = document.createElement('p');
              congratsText.textContent = 'Gefeliciteerd, je hebt alles goed!';
              overlayContent.appendChild(congratsText);

              const endQuizButton = document.createElement('button');
              endQuizButton.textContent = 'Beëindig quiz';
              endQuizButton.classList.add('end-quiz-button');
              overlayContent.appendChild(endQuizButton);

              endQuizButton.addEventListener('click', function() {
                document.body.removeChild(overlayContent.parentNode);
              });
            }
          } else {
            answerButton.classList.add('incorrect-answer');
          }

          const answerStatus = overlayContent.querySelector('.answer-status');
          if (!answerStatus) {
            const newAnswerStatus = document.createElement('p');
            newAnswerStatus.classList.add('answer-status');
            overlayContent.appendChild(newAnswerStatus);
          }

          const existingAnswerStatus = overlayContent.querySelector('.answer-status');
          existingAnswerStatus.textContent = answer === correctAnswer ? 'Goed!' : 'Fout!';
        });
      });
    } else {
      document.body.removeChild(overlayContent.parentNode);
    }
  }

  closeButton.addEventListener('click', function() {
    document.body.style.overflow = 'auto';
    overlay.style.display = 'none';
    isOverlayOpen = false; // Overlay wordt gesloten, de variabele bijwerken
  });

  overlayMenu.forEach(menuItem => {
    menuItem.addEventListener('click', function() {
      const category = this.querySelector('.category-name').textContent.trim();
      displayArticle(category);
    });
  });

  function displayArticle(category) {
    const articleTitle = document.querySelector('.article-intro h1');
    const articleIntro = document.querySelector('.article-intro p');
    const articleBody = document.querySelector('.article-text');

    articleTitle.textContent = articles[category].title;
    articleIntro.innerHTML = articles[category].intro;
    articleBody.innerHTML = articles[category].body;
  }

  fetch('world-map.svg')
    .then(response => response.text())
    .then(svgData => {
      mapContainer.innerHTML = svgData;

      mapContainer.querySelectorAll('path').forEach(path => {
        path.addEventListener('click', handlePathClick);
      });
    })
    .catch(error => console.error('Fout bij het laden van de SVG:', error));

  function handlePathClick() {
    const landNaam = this.getAttribute('class') || this.getAttribute('name');
    const trimmedLandNaam = landNaam ? landNaam.trim() : '';
    showOverlay(trimmedLandNaam, 'Hoofdstad');
  }

  function preventDefaultScroll(e) {
    e.preventDefault();
  }

  function showOverlay(landNaam, category) {
    landNaamElement.textContent = landNaam;
    document.body.style.overflow = 'hidden';
    overlay.style.display = 'flex';
    overlay.querySelector('.category-name').textContent = category;
    displayArticle(category);

    window.addEventListener('scroll', preventDefaultScroll);
    isOverlayOpen = true; // Overlay wordt geopend, de variabele bijwerken
  }
});
