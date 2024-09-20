$(function() {
    // Sélectionne tous les éléments <li> du menu principal
    var $mainMenuItems = $("#main-menu ul").children("li");
    var totalMainMenuItems = $mainMenuItems.length; // Nombre total d'éléments dans le menu
    var openedIndex = 2; // Index de l'élément ouvert au démarrage

    // Fonction d'initialisation qui lie les événements et ouvre l'élément initial
    var init = function() {
        bindEvents(); // Lie les événements click et hover
        if (validIndex(openedIndex)) {
            animateItem($mainMenuItems.eq(openedIndex), true, 700); // Ouvre l'élément initial
        }
    };

    // Fonction qui gère les événements
    var bindEvents = function() {
        // Lorsqu'on clique sur une image, récupère l'index du parent <li> et anime l'élément
        $mainMenuItems.children(".images").click(function() {
            var newIndex = $(this).parent().index(); // Récupère l'index du <li> parent
            checkAndAnimateItem(newIndex); // Vérifie et anime l'élément cliqué
        });

        // Ajoute la classe 'hovered' lors du survol des boutons et la retire à la sortie
        $(".button").hover(
            function() {
                $(this).addClass("hovered"); // Ajoute la classe 'hovered' au survol
            },
            function() {
                $(this).removeClass("hovered"); // Retire la classe 'hovered' à la sortie
            }
        );

        // Lorsqu'on clique sur un bouton, récupère l'index et anime l'élément correspondant
        $(".button").click(function() {
            var newIndex = $(this).index(); // Récupère l'index du bouton cliqué
            checkAndAnimateItem(newIndex); // Vérifie et anime l'élément correspondant
        });
    };

    // Vérifie si l'index est valide (dans les limites du tableau d'éléments)
    var validIndex = function(indexToCheck) {
        return (indexToCheck >= 0) && (indexToCheck < totalMainMenuItems);
    };

    // Anime l'élément pour l'ouvrir ou le fermer
    var animateItem = function($item, toOpen, speed) {
        var $color_Image = $item.find(".color"); // Sélectionne l'image en couleur
        var itemParam = toOpen ? {width: "500px"} : {width: "216px"}; // Largeur de l'élément à ouvrir/fermer
        var colorImageParam = toOpen ? {left: "0px"} : {left: "216px"}; // Position de l'image en couleur

        // Anime l'image en couleur et l'élément selon les paramètres
        $color_Image.animate(colorImageParam, speed);
        $item.animate(itemParam, speed);
    };

    // Vérifie si l'élément cliqué est différent de l'élément ouvert et lance l'animation
    var checkAndAnimateItem = function(indexToCheckAndAnimate) {
        if (openedIndex === indexToCheckAndAnimate) {
            // Si l'élément cliqué est déjà ouvert, on le ferme
            animateItem($mainMenuItems.eq(indexToCheckAndAnimate), false, 250);
            openedIndex = -1; // Réinitialise l'index
        } else {
            if (validIndex(indexToCheckAndAnimate)) {
                // Ferme l'élément ouvert actuel et ouvre le nouveau
                animateItem($mainMenuItems.eq(openedIndex), false, 250);
                openedIndex = indexToCheckAndAnimate; // Met à jour l'index ouvert
                animateItem($mainMenuItems.eq(openedIndex), true, 250); // Ouvre le nouvel élément
            }
        }
    };

    // Appel de la fonction d'initialisation au chargement de la page
    init();
});
