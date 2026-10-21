#!/usr/bin/env python3
"""Génère les données du référentiel Technologie XP-NOVA (RT-TECH v1.0 validé le 21/10/2026).
Sorties : data/rt-tech.fr.json, data/rt-tech.en.json, data/sous-fonctions.csv, data/equipements.csv
"""
import json, csv, os, re

VERSION = "1.0"
DATE = "2026-10-21"

# ---------- Domaines ----------
DOMAINES = [
  ("T1", "Mécanisation", "Mechanisation", "mecanisation", "mechanisation"),
  ("T2", "Irrigation et eau", "Irrigation and water", "irrigation-eau", "irrigation-water"),
  ("T3", "Environnements de production contrôlés", "Controlled production environments", "environnements-controles", "controlled-environments"),
  ("T4", "Transformation et usines", "Processing and plants", "transformation-usines", "processing-plants"),
  ("T5", "Stockage, conservation et froid", "Storage, preservation and cold chain", "stockage-froid", "storage-cold-chain"),
  ("T6", "Énergie et utilités", "Energy and utilities", "energie-utilites", "energy-utilities"),
  ("T7", "Manutention et logistique", "Handling and logistics", "manutention-logistique", "handling-logistics"),
  ("T8", "Équipements numériques", "Digital equipment", "equipements-numeriques", "digital-equipment"),
]
TRANSVERSAL = {"T6", "T8"}

# ---------- Services ----------
SERVICES = [
  ("TS-01", "Analyse du besoin", "Needs analysis", ["Rapport d'analyse du besoin", "Cartographie de l'existant", "Identification des écarts"], ["Needs analysis report", "Mapping of the existing situation", "Gap identification"], "5 à 10 jours", "5 to 10 days", "comprendre", ["XPN-E2.3","XPN-E2.4","XPN-E2.5","XPN-E2.6"]),
  ("TS-02", "Variantes", "Options study", ["Étude de variantes", "Comparatif technico-économique", "Recommandation"], ["Options study", "Technical and economic comparison", "Recommendation"], "10 à 15 jours", "10 to 15 days", "concevoir", ["XPN-E2.3","XPN-E2.4","XPN-E2.5","XPN-E2.6"]),
  ("TS-03", "Architecture technique", "Technical architecture", ["Schémas fonctionnels", "Architecture système", "Note de dimensionnement"], ["Functional diagrams", "System architecture", "Sizing note"], "10 à 20 jours", "10 to 20 days", "concevoir", ["XPN-E2.3","XPN-E2.4","XPN-E2.5","XPN-E2.6"]),
  ("TS-04", "Dimensionnement", "Sizing", ["Calculs de dimensionnement", "Notes de calcul", "Spécifications de capacités"], ["Sizing calculations", "Calculation notes", "Capacity specifications"], "5 à 15 jours", "5 to 15 days", "concevoir", ["XPN-E2.3","XPN-E2.4","XPN-E2.5","XPN-E2.6"]),
  ("TS-05", "Cahiers des charges", "Technical specifications", ["Cahier des charges technique", "Grille d'évaluation", "Critères de sélection"], ["Technical specification", "Evaluation grid", "Selection criteria"], "10 à 15 jours", "10 to 15 days", "concevoir", ["XPN-E2.7"]),
  ("TS-06", "Analyse d'offres", "Bid analysis", ["Analyse comparative", "Grille d'évaluation", "Recommandation de choix"], ["Comparative analysis", "Evaluation grid", "Selection recommendation"], "5 à 10 jours", "5 to 10 days", "realiser", ["XPN-E4.2"]),
  ("TS-07", "Essais / testing", "Testing", ["Protocoles d'essai", "Grilles de vérification", "Rapports d'essai"], ["Test protocols", "Verification grids", "Test reports"], "Selon la complexité", "Depends on complexity", "realiser", ["XPN-E4.3"]),
  ("TS-08", "Vérification de performance", "Performance verification", ["Rapport de tests", "Validation des capacités", "Certificat de conformité contractuelle"], ["Test report", "Capacity validation", "Contractual conformity certificate"], "3 à 7 jours", "3 to 7 days", "realiser", ["XPN-E4.4"]),
  ("TS-09", "Assistance à la réception", "Acceptance support", ["Procès-verbal de réception", "Documentation de transfert", "Supports de formation"], ["Acceptance report", "Handover documentation", "Training materials"], "2 à 5 jours", "2 to 5 days", "perenniser", ["XPN-E4.4"]),
  ("TS-10", "Assistance à l'intégration", "Integration support", ["Plan d'intégration", "Spécifications d'interfaces", "Procès-verbal de recette fonctionnelle"], ["Integration plan", "Interface specifications", "Functional acceptance report"], "Selon la complexité", "Depends on complexity", "realiser", ["XPN-E4.4","XPN-E5.4"]),
]

CYCLE_VIE = [
  ("CV1", "Disponibilité locale", "Local availability"),
  ("CV2", "Approvisionnement", "Procurement"),
  ("CV3", "Installation", "Installation"),
  ("CV4", "Mise en service", "Commissioning"),
  ("CV5", "Sécurité", "Safety"),
  ("CV6", "Pièces de rechange", "Spare parts"),
  ("CV7", "Maintenance", "Maintenance"),
  ("CV8", "Coûts d'exploitation", "Operating costs"),
  ("CV9", "Renouvellement", "Renewal"),
]

# ---------- Sous-fonctions ----------
# code, fr, en, types, maillons, vue, equipements[(fr, en, type)], grandeurs fr/en, risques fr/en, normes fr/en, services
SF = [
 ("T1.1","Défrichage et préparation du sol","Land clearing and soil preparation","P",["DP1","DP7"],"produire",
  [("Tracteur","Tractor","P"),("Charrue, pulvériseur à disques","Plough, disc harrow","P"),("Motoculteur","Power tiller","P"),("Traction animale","Animal traction","P")],
  "Surface, sol, pente, fenêtre de travail, puissance (kW)","Area, soil, slope, working window, power (kW)",
  "Pièces et ateliers rares hors des grandes villes ; souches ; pistes","Parts and workshops scarce outside major cities; stumps; rural tracks",
  "ISO 4254 (int.) ; mandat de promotion du CENEEMA","ISO 4254 (intl.); CENEEMA promotion mandate",["TS-01","TS-02","TS-04"]),
 ("T1.2","Semis, plantation et fertilisation","Sowing, planting and fertilisation","P",["DP1"],"produire",
  [("Semoir","Seeder","P"),("Planteuse manioc ou plantain","Cassava or plantain planter","P"),("Repiqueuse à riz","Rice transplanter","P"),("Épandeur d'engrais ou de chaux","Fertiliser or lime spreader","P")],
  "Densité, débit de chantier (ha/j), dose","Density, field capacity (ha/day), rate",
  "Boutures hétérogènes ; peu de matériel adapté sur le marché local","Heterogeneous cuttings; little suitable equipment on the local market",
  "ISO 4254 (int.)","ISO 4254 (intl.)",["TS-02","TS-04","TS-05"]),
 ("T1.3","Protection phytosanitaire","Crop protection","P,H",["DP1"],"produire",
  [("Pulvérisateur à dos","Knapsack sprayer","P"),("Atomiseur motorisé","Motorised mist blower","P"),("Rampe tractée","Trailed boom sprayer","P"),("Drone de pulvérisation","Spraying drone","H")],
  "Volume par ha, taille de gouttes, autonomie","Volume per ha, droplet size, autonomy",
  "Exposition des opérateurs ; résidus à l'export ; cadre drone en construction","Operator exposure; export residues; drone framework still being drafted",
  "Certification des appareils de traitement : CNHPCAT (MINADER) ; drones : autorisation CCAA ; ISO 16119 (int.)","Sprayer certification: CNHPCAT (MINADER); drones: CCAA authorisation; ISO 16119 (intl.)",["TS-02","TS-05","TS-07"]),
 ("T1.4","Récolte et post-récolte primaire","Harvest and primary post-harvest","P",["DP1"],"produire",
  [("Moissonneuse-batteuse","Combine harvester","P"),("Batteuse","Thresher","P"),("Égreneuse à maïs","Maize sheller","P"),("Écabosseuse, décortiqueuse d'arachide","Cocoa pod breaker, groundnut sheller","P")],
  "Débit (t/h), taux de pertes, taux de casse","Throughput (t/h), loss rate, breakage rate",
  "Pluies pendant la récolte ; accès des machines aux parcelles","Rain during harvest; machine access to plots",
  "ISO 4254 (int.)","ISO 4254 (intl.)",["TS-02","TS-04","TS-08"]),
 ("T1.5","Mécanisation de l'élevage et des fourrages","Livestock and forage mechanisation","P",["DP2"],"produire",
  [("Broyeur-mélangeur fermier","Farm grinder-mixer","P"),("Faucheuse, ensileuse","Mower, forage harvester","P"),("Distributeur d'aliment","Feed distributor","P")],
  "Cheptel, ration journalière, autonomie fourragère","Herd size, daily ration, forage autonomy",
  "Fourrages saisonniers ; énergie","Seasonal forage; energy",
  "ISO 4254 (int.)","ISO 4254 (intl.)",["TS-01","TS-04"]),
 ("T1.6","Organisation des parcs","Fleet organisation","P,H",["DP1","DP2"],"resister",
  [("Parc mutualisé","Shared machinery pool","P"),("Remorque, tricycle motorisé","Trailer, motorised tricycle","P"),("Télémétrie de flotte","Fleet telematics","H")],
  "Heures d'utilisation par an, coût horaire en FCFA, rayon de service","Hours of use per year, hourly cost in FCFA, service radius",
  "Gouvernance du partage ; sous-utilisation ; maintenance","Sharing governance; under-use; maintenance",
  "Pools de mécanisation du CENEEMA (référence publique)","CENEEMA mechanisation pools (public reference)",["TS-01","TS-02","TS-03"]),
 ("T2.1","Mobilisation de la ressource en eau","Water resource mobilisation","P",["DP1","DP2","DP6"],"produire",
  [("Forage","Borehole","P"),("Puits","Well","P"),("Prise en rivière","River intake","P"),("Retenue collinaire","Hillside reservoir","P")],
  "Débit d'exploitation (m³/h), rabattement, pointe de besoin","Operating flow (m³/h), drawdown, peak demand",
  "Débit non garanti sans essai de pompage ; droits sur l'eau","Flow not guaranteed without pumping test; water rights",
  "Régime d'autorisation des prélèvements : à vérifier ; travaux par DS.S21","Abstraction permit regime: to be verified; works by DS.S21",["TS-01","TS-04","TS-07"]),
 ("T2.2","Pompage","Pumping","P,H",["DP1","DP2","DP6"],"produire",
  [("Motopompe","Engine-driven pump","P"),("Électropompe","Electric pump","P"),("Pompe solaire de surface ou immergée","Solar surface or submersible pump","H"),("Bélier hydraulique","Hydraulic ram","P")],
  "Débit, hauteur manométrique totale (m), heures de pompage","Flow, total dynamic head (m), pumping hours",
  "Sable, cavitation, vol de panneaux, carburant","Sand, cavitation, panel theft, fuel",
  "ISO 9906 (int.) ; IEC 62253 (int.)","ISO 9906 (intl.); IEC 62253 (intl.)",["TS-02","TS-04","TS-08"]),
 ("T2.3","Stockage et adduction","Storage and conveyance","P",["DP1","DP2","DP3"],"resister",
  [("Réservoir","Tank","P"),("Château d'eau","Water tower","P"),("Bassin en géomembrane","Geomembrane pond","P"),("Conduites","Pipelines","P")],
  "Autonomie (jours), pression de service, diamètres","Autonomy (days), service pressure, diameters",
  "Fuites, évaporation, qualité de pose","Leaks, evaporation, installation quality",
  "Règles de l'art","Good practice",["TS-03","TS-04","TS-05"]),
 ("T2.4","Irrigation localisée et fertirrigation","Localised irrigation and fertigation","P,H",["DP1"],"produire",
  [("Goutte-à-goutte","Drip irrigation","P"),("Micro-aspersion","Micro-sprinklers","P"),("Injecteur de fertirrigation","Fertigation injector","H"),("Station de filtration","Filtration station","P")],
  "Besoin de la culture (mm/j), débit par goutteur, uniformité","Crop requirement (mm/day), emitter flow, uniformity",
  "Colmatage ; rongeurs ; qualité variable des gaines importées","Clogging; rodents; variable quality of imported tapes",
  "ISO 9261 (int.)","ISO 9261 (intl.)",["TS-02","TS-04","TS-05"]),
 ("T2.5","Aspersion et irrigation gravitaire","Sprinkler and gravity irrigation","P",["DP1"],"produire",
  [("Asperseurs, enrouleurs","Sprinklers, hose reels","P"),("Canaux et ouvrages de régulation","Canals and control structures","P"),("Planage de rizière","Paddy levelling","P")],
  "Dose, intervalle, pente, pertes en réseau","Dose, interval, slope, network losses",
  "Coût énergétique de l'aspersion ; entretien collectif des canaux","Energy cost of sprinkling; collective canal maintenance",
  "Règles de l'art","Good practice",["TS-02","TS-03","TS-04"]),
 ("T2.6","Traitement de l'eau, eau de process et abreuvement","Water treatment, process water and watering","P",["DP2","DP3","DP6"],"transformer",
  [("Filtration, désinfection","Filtration, disinfection","P"),("Adoucisseur","Water softener","P"),("Abreuvoirs, pipettes","Drinkers, nipples","P")],
  "Besoin par animal ou par tonne transformée, qualité visée","Requirement per animal or per tonne processed, target quality",
  "Eau de process non potable ; biofilm dans les réseaux d'élevage","Non-potable process water; biofilm in livestock lines",
  "Eau potable exigée par les démarches HACCP ; texte national à vérifier","Potable water required by HACCP; national text to be verified",["TS-01","TS-04","TS-05"]),
 ("T3.1","Serres, tunnels et ombrières","Greenhouses, tunnels and shade houses","P",["DP1"],"produire",
  [("Tunnel, chapelle","Tunnel, gable greenhouse","P"),("Ombrière, filet anti-insectes","Shade house, insect net","P")],
  "Surface, charge de vent, surface d'ouvrants, couverture","Area, wind load, vent area, cladding",
  "Surchauffe en zone forestière ; vent en altitude ; durée de vie du film","Overheating in forest zone; wind at altitude; film lifetime",
  "EN 13031-1 (int.)","EN 13031-1 (intl.)",["TS-02","TS-03","TS-05"]),
 ("T3.2","Climat, hors-sol et pépinières","Climate control, soilless culture and nurseries","H",["DP1"],"produire",
  [("Ventilation, brumisation","Ventilation, fogging","H"),("Régulation climatique","Climate controller","H"),("Hydroponie, tables de culture","Hydroponics, growing tables","P")],
  "Température et humidité cibles, renouvellement d'air","Target temperature and humidity, air changes",
  "Maladies fongiques en humidité élevée ; énergie","Fungal diseases at high humidity; energy",
  "Règles de l'art","Good practice",["TS-03","TS-04"]),
 ("T3.3","Bâtiments et équipements d'élevage","Livestock buildings and equipment","P",["DP2"],"produire",
  [("Ventilation, éclairage","Ventilation, lighting","P"),("Mangeoires, abreuvoirs, cages","Feeders, drinkers, cages","P"),("Pédiluves, fosses à effluents","Footbaths, slurry pits","P"),("Ruches, extracteurs","Hives, honey extractors","P")],
  "Densité animale, débit d'air par tête, volume d'effluents","Stocking density, airflow per head, effluent volume",
  "Chaleur ; biosécurité (influenza aviaire, peste porcine africaine) ; effluents","Heat; biosecurity (avian influenza, African swine fever); effluents",
  "Règles sanitaires MINEPIA : à confirmer par texte","MINEPIA sanitary rules: to be confirmed",["TS-01","TS-03","TS-05"]),
 ("T3.4","Couvoirs et incubation","Hatcheries and incubation","H",["DP2"],"resister",
  [("Incubateur, éclosoir","Incubator, hatcher","H"),("Groupe de secours dédié","Dedicated backup generator","P")],
  "Capacité par cycle, stabilité thermique","Capacity per cycle, thermal stability",
  "Coupure de courant = risque de perte du lot","Power cut = risk of losing the batch",
  "Agrément MINEPIA : à confirmer","MINEPIA approval: to be confirmed",["TS-04","TS-07","TS-08"]),
 ("T3.5","Aquaculture","Aquaculture","P,H",["DP6"],"produire",
  [("Bassins, cages flottantes","Ponds, floating cages","P"),("Aérateurs, oxygénation","Aerators, oxygenation","H"),("Système en recirculation","Recirculating system","H")],
  "Biomasse (kg/m³), oxygène dissous, renouvellement d'eau","Biomass (kg/m³), dissolved oxygen, water exchange",
  "Coût de l'aliment ; énergie des aérateurs ; vols","Feed cost; aerator energy; theft",
  "Autorisations MINEPIA : à confirmer","MINEPIA authorisations: to be confirmed",["TS-02","TS-04","TS-08"]),
 ("T4.1","Réception, nettoyage et tri d'entrée","Intake, cleaning and sorting","P",["DP3"],"transformer",
  [("Laveuse, épierreur","Washer, destoner","P"),("Trieur, tamis","Sorter, sieve","P")],
  "Débit (t/h), taux d'impuretés","Throughput (t/h), impurity rate",
  "Matière première hétérogène","Heterogeneous raw material",
  "ISO 12100 (int.)","ISO 12100 (intl.)",["TS-03","TS-04"]),
 ("T4.2","Décorticage, broyage et mouture","Hulling, grinding and milling","P",["DP3"],"transformer",
  [("Décortiqueuse à riz","Rice huller","P"),("Broyeur à marteaux, moulin","Hammer mill, grinder","P"),("Râpe à manioc","Cassava grater","P")],
  "Débit, rendement au décorticage, granulométrie","Throughput, hulling yield, particle size",
  "Usure ; poussières ; pièces importées","Wear; dust; imported parts",
  "ISO 12100 (int.)","ISO 12100 (intl.)",["TS-02","TS-04","TS-08"]),
 ("T4.3","Pressage et extraction","Pressing and extraction","P",["DP3"],"transformer",
  [("Presse à huile de palme ou d'arachide","Palm or groundnut oil press","P"),("Extracteur de jus","Juice extractor","P"),("Presse à pulpe de manioc","Cassava pulp press","P")],
  "Débit, taux d'extraction","Throughput, extraction rate",
  "Acidité de l'huile si le délai avant traitement s'allonge","Oil acidity if processing is delayed",
  "Huiles végétales enrichies : NC 77 rendue obligatoire en 2011 (selon la presse)","Fortified vegetable oils: NC 77 made mandatory in 2011 (press reports)",["TS-02","TS-04","TS-08"]),
 ("T4.4","Séchage, fumage et lyophilisation","Drying, smoking and freeze-drying","P,H",["DP3","DP6"],"transformer",
  [("Séchoir solaire","Solar dryer","P"),("Séchoir au gaz ou à biomasse","Gas or biomass dryer","P"),("Four de fumage du poisson","Fish smoking kiln","P"),("Lyophilisateur","Freeze-dryer","H")],
  "Eau à évaporer (kg/h), humidité finale, énergie spécifique","Water to evaporate (kg/h), final moisture, specific energy",
  "HAP sur les produits fumés ; humidité ambiante ; coût de l'énergie","PAH on smoked products; ambient humidity; energy cost",
  "Teneurs en HAP exigées par les marchés d'export : à vérifier par marché","PAH limits required by export markets: to be checked per market",["TS-02","TS-04","TS-08"]),
 ("T4.5","Traitement thermique","Thermal processing","P,H",["DP3"],"transformer",
  [("Pasteurisateur","Pasteuriser","H"),("Autoclave","Autoclave","P"),("Cuiseur, torréfacteur","Cooker, roaster","P")],
  "Barème temps-température, débit","Time-temperature schedule, throughput",
  "Maîtrise des barèmes ; appareils à pression","Schedule control; pressure equipment",
  "Codex CXC 1-1969 (int.) ; appareils à pression : à vérifier","Codex CXC 1-1969 (intl.); pressure equipment: to be verified",["TS-03","TS-05","TS-07"]),
 ("T4.6","Mélange et formulation","Mixing and formulation","P",["DP3"],"transformer",
  [("Mélangeur","Mixer","P"),("Presse à granulés","Pellet mill","P"),("Pétrin, four","Kneader, oven","P")],
  "Débit, homogénéité, calibre des granulés","Throughput, homogeneity, pellet size",
  "Matières premières variables ; mycotoxines","Variable raw materials; mycotoxins",
  "Codex (int.) ; aliments du bétail : MINEPIA à vérifier","Codex (intl.); animal feed: MINEPIA to be verified",["TS-02","TS-04"]),
 ("T4.7","Abattage et découpe","Slaughter and cutting","P",["DP3"],"transformer",
  [("Ligne d'abattage volaille ou porc","Poultry or pig slaughter line","P"),("Matériel de découpe","Cutting equipment","P")],
  "Cadence (têtes/h), eau par tête, effluents","Rate (heads/h), water per head, effluents",
  "Agrément sanitaire ; sous-produits","Sanitary approval; by-products",
  "Agrément et inspection vétérinaire MINEPIA : à confirmer","MINEPIA approval and veterinary inspection: to be confirmed",["TS-03","TS-05","TS-07"]),
 ("T4.8","Conditionnement et emballage","Packing and packaging","P,H",["DP3","DP5"],"exporter",
  [("Doseuse, ensacheuse","Dosing and bagging machine","P"),("Thermoscelleuse, sous-vide","Heat sealer, vacuum packer","P"),("Étiqueteuse","Labeller","H")],
  "Cadence, format, précision de dosage","Rate, format, dosing accuracy",
  "Emballages importés ; étiquetage export","Imported packaging; export labelling",
  "Exigences du marché cible ; GS1 (int.)","Target market requirements; GS1 (intl.)",["TS-02","TS-05","TS-08"]),
 ("T4.9","Hygiène, nettoyage en place et contrôle qualité d'usine","Hygiene, CIP and plant quality control","H",["DP3"],"exporter",
  [("Nettoyage en place","Clean-in-place","H"),("Détecteur de métaux","Metal detector","H"),("Laboratoire d'usine","Plant laboratory","P")],
  "Plan de nettoyage, points critiques HACCP","Cleaning plan, HACCP critical points",
  "Eau ; compétences ; étalonnage","Water; skills; calibration",
  "ISO 22000, Codex CXC 1-1969 (int.) ; ISO/IEC 17025 si accréditation visée","ISO 22000, Codex CXC 1-1969 (intl.); ISO/IEC 17025 if accreditation sought",["TS-03","TS-05","TS-07"]),
 ("T5.1","Stockage sec","Dry storage","P",["DP1","DP4"],"resister",
  [("Silo","Silo","P"),("Crib à maïs","Maize crib","P"),("Magasin, entrepôt sous sac","Warehouse, bag storage","P")],
  "Volume (t), rotation, humidité de stockage","Volume (t), turnover, storage moisture",
  "Insectes ; moisissures et aflatoxines ; inondation","Insects; mould and aflatoxins; flooding",
  "Règles de l'art","Good practice",["TS-02","TS-04","TS-05"]),
 ("T5.2","Protection des stocks","Stock protection","P",["DP4"],"resister",
  [("Sacs hermétiques","Hermetic bags","P"),("Cocons de stockage","Storage cocoons","P"),("Bâches de fumigation","Fumigation sheets","P")],
  "Volume, durée de conservation","Volume, storage duration",
  "Produits de fumigation soumis à homologation","Fumigants subject to registration",
  "Homologation des produits : CNHPCAT (MINADER)","Product registration: CNHPCAT (MINADER)",["TS-01","TS-02"]),
 ("T5.3","Chambres froides positives et négatives","Chilled and frozen cold rooms","P,H",["DP3","DP4"],"exporter",
  [("Chambre froide positive","Chilled cold room","H"),("Chambre froide négative","Frozen cold room","H"),("Chambre de ressuage","Ripening room","P")],
  "Volume (m³), température, puissance frigorifique, entrées journalières","Volume (m³), temperature, cooling capacity, daily intake",
  "Coupures réseau ; choix des fluides ; isolation","Grid outages; refrigerant choice; insulation",
  "EN 378 (int.) ; amendement de Kigali ratifié par le Cameroun","EN 378 (intl.); Kigali Amendment ratified by Cameroon",["TS-03","TS-04","TS-08"]),
 ("T5.4","Froid mobile et collecte","Mobile cold chain and collection","P",["DP4","DP5"],"exporter",
  [("Tank à lait","Milk tank","P"),("Camion frigorifique","Refrigerated truck","P"),("Conteneur frigorifique","Reefer container","P"),("Caisson isotherme","Insulated box","P")],
  "Volume, autonomie, température de transport","Volume, autonomy, transport temperature",
  "Pistes ; carburant ; rupture au transbordement","Tracks; fuel; break at transshipment",
  "Accord ATP (int.) : applicabilité au Cameroun à vérifier","ATP Agreement (intl.): applicability in Cameroon to be verified",["TS-02","TS-04"]),
 ("T5.5","Glace et prérefroidissement","Ice and pre-cooling","P",["DP4","DP6"],"exporter",
  [("Machine à glace","Ice machine","P"),("Prérefroidissement à air forcé ou à l'eau","Forced-air or hydro pre-cooling","P")],
  "Production de glace (t/j), temps de refroidissement","Ice output (t/day), cooling time",
  "Eau potable pour la glace ; énergie","Potable water for ice; energy",
  "Hygiène des produits de la pêche : à vérifier","Fishery product hygiene: to be verified",["TS-02","TS-04"]),
 ("T6.1","Bilan de puissance, raccordement et distribution électrique","Power balance, grid connection and distribution","P",["ALL"],"resister",
  [("Poste de transformation","Transformer substation","P"),("Tableau général basse tension","Main LV switchboard","P"),("Compensation de l'énergie réactive","Reactive power compensation","P")],
  "Puissance appelée (kVA), facteur de puissance, profil de charge","Demand (kVA), power factor, load profile",
  "Délestages ; chutes de tension ; délais de raccordement","Load shedding; voltage drops; connection delays",
  "IEC 60364 (int.) ; NF C 15-100 d'usage courant, statut à vérifier ; régulateur : ARSEL","IEC 60364 (intl.); NF C 15-100 in common use, status to be verified; regulator: ARSEL",["TS-01","TS-03","TS-04"]),
 ("T6.2","Solaire photovoltaïque et stockage par batteries","Solar PV and battery storage","H",["ALL"],"resister",
  [("Champ photovoltaïque","PV array","P"),("Onduleur, régulateur","Inverter, charge controller","H"),("Batteries lithium ou plomb","Lithium or lead batteries","H")],
  "Énergie journalière (kWh/j), autonomie, ensoleillement du site","Daily energy (kWh/day), autonomy, site irradiation",
  "Poussières au Nord ; vols ; qualité des modules importés ; fin de vie des batteries","Dust in the North; theft; quality of imported modules; battery end of life",
  "IEC 61215, IEC 62446-1 (int.) ; PECAE à l'import","IEC 61215, IEC 62446-1 (intl.); PECAE on import",["TS-02","TS-04","TS-08"]),
 ("T6.3","Groupes électrogènes et continuité","Generators and continuity of supply","P,H",["ALL"],"resister",
  [("Groupe électrogène","Generator set","P"),("Inverseur de source","Transfer switch","H"),("Onduleur ASI","UPS","H")],
  "Puissance secourue, autonomie en carburant, temps de bascule","Backed-up power, fuel autonomy, switchover time",
  "Prix et disponibilité du gasoil ; entretien","Diesel price and availability; servicing",
  "Essai de continuité en charge exigé à l'étape 9 AGROVITA","Loaded continuity test required at AGROVITA step 9",["TS-04","TS-07","TS-08"]),
 ("T6.4","Bioénergies","Bioenergy","P",["DP2","DP3"],"resister",
  [("Digesteur à biogaz","Biogas digester","P"),("Chaudière ou gazéifieur à biomasse","Biomass boiler or gasifier","P")],
  "Gisement (t/an), pouvoir calorifique, production (m³/j)","Feedstock (t/year), calorific value, output (m³/day)",
  "Régularité du gisement ; savoir-faire d'exploitation","Feedstock regularity; operating know-how",
  "Règles de l'art","Good practice",["TS-01","TS-02","TS-04"]),
 ("T6.5","Chaleur et vapeur de process","Process heat and steam","P",["DP3"],"transformer",
  [("Chaudière, générateur de vapeur","Boiler, steam generator","P"),("Échangeurs","Heat exchangers","P")],
  "Besoin thermique (kW), pression","Heat demand (kW), pressure",
  "Appareils à pression ; combustible","Pressure equipment; fuel",
  "Appareils à pression : à vérifier","Pressure equipment: to be verified",["TS-03","TS-04","TS-07"]),
 ("T6.6","Air comprimé, eaux de process et effluents industriels","Compressed air, process water and industrial effluents","P",["DP3"],"transformer",
  [("Compresseur","Compressor","P"),("Tour de refroidissement","Cooling tower","P"),("Station d'épuration agro-industrielle","Agro-industrial wastewater plant","P")],
  "Débit d'air, charge polluante (DBO, DCO)","Air flow, pollution load (BOD, COD)",
  "Rejets non conformes ; contrôles environnementaux","Non-compliant discharges; environmental inspections",
  "Études d'impact et rejets : MINEPDED, seuils à vérifier","Impact studies and discharges: MINEPDED, thresholds to be verified",["TS-01","TS-03","TS-05"]),
 ("T7.1","Manutention de vrac","Bulk handling","P",["DP3","DP4"],"transformer",
  [("Convoyeur à bande","Belt conveyor","P"),("Élévateur à godets","Bucket elevator","P"),("Vis sans fin","Screw conveyor","P")],
  "Débit (t/h), hauteur, masse volumique","Throughput (t/h), height, bulk density",
  "Poussières de céréales explosives ; usure","Explosive grain dust; wear",
  "ISO 12100 (int.)","ISO 12100 (intl.)",["TS-03","TS-04"]),
 ("T7.2","Manutention de charges et rayonnage","Load handling and racking","P",["DP3","DP4"],"transformer",
  [("Chariot élévateur","Forklift","P"),("Transpalette","Pallet truck","P"),("Palan, rayonnage","Hoist, racking","P")],
  "Charge, hauteur de levage, largeur d'allée","Load, lift height, aisle width",
  "Formation des caristes ; sols inadaptés","Operator training; unsuitable floors",
  "ISO 3691-1 (int.)","ISO 3691-1 (intl.)",["TS-03","TS-05"]),
 ("T7.3","Pesage et métrologie","Weighing and metrology","P,H",["DP3","DP4","DP5"],"exporter",
  [("Bascule, pont-bascule","Platform scale, weighbridge","P"),("Balance connectée","Connected scale","H")],
  "Portée, échelon, fréquence d'étalonnage","Capacity, resolution, calibration frequency",
  "Fraude au poids ; étalonnage irrégulier","Weight fraud; irregular calibration",
  "Métrologie légale : autorité et texte à confirmer","Legal metrology: authority and text to be confirmed",["TS-05","TS-07","TS-08"]),
 ("T7.4","Tri, calibrage et conditionnement export","Sorting, grading and export packing","P,H",["DP4","DP5"],"exporter",
  [("Calibreuse à fruits","Fruit grader","P"),("Trieur optique café ou cacao","Optical sorter for coffee or cocoa","H"),("Ligne de station de conditionnement","Packhouse line","P")],
  "Débit, classes de calibre, taux de rejet","Throughput, size classes, reject rate",
  "Exigences des acheteurs ; énergie","Buyer requirements; energy",
  "Normes du marché cible ; RDUE pour cacao, café et bois","Target market standards; EUDR for cocoa, coffee and timber",["TS-02","TS-05","TS-08"]),
 ("T7.5","Transport et flotte","Transport and fleet","P,H",["DP4"],"exporter",
  [("Camion plateau ou benne","Flatbed or tipper truck","P"),("Caisses-palettes","Pallet boxes","P"),("Télématique","Telematics","H")],
  "Tonnage, rotations, distances","Tonnage, trips, distances",
  "Pistes en saison des pluies ; charge à l'essieu","Tracks in the rainy season; axle load",
  "Charge à l'essieu : texte à vérifier","Axle load: text to be verified",["TS-01","TS-02","TS-04"]),
 ("T7.6","Plateformes de collecte et de groupage","Collection and consolidation platforms","P",["DP4"],"exporter",
  [("Magasin de collecte","Collection warehouse","P"),("Aire de séchage","Drying yard","P"),("Quai de chargement","Loading dock","P")],
  "Volumes collectés, bassin d'approvisionnement","Collected volumes, supply catchment",
  "Foncier ; gouvernance coopérative","Land tenure; cooperative governance",
  "Interface avec ODT (équipements collectifs)","Interface with ODT (community facilities)",["TS-01","TS-03"]),
 ("T8.1","Capteurs et IoT","Sensors and IoT","H",["ALL"],"resister",
  [("Sonde d'humidité du sol","Soil moisture probe","H"),("Station météo connectée","Connected weather station","H"),("Enregistreur température et humidité","Temperature and humidity logger","H")],
  "Nombre de points, fréquence de mesure, autonomie","Number of points, sampling frequency, autonomy",
  "Couverture réseau ; vandalisme ; recalibrage","Network coverage; vandalism; recalibration",
  "Règles de l'art","Good practice",["TS-03","TS-05"]),
 ("T8.2","Télédétection et drones","Remote sensing and drones","N,H",["DP1","DP7"],"produire",
  [("Drone d'imagerie","Imaging drone","H"),("Imagerie satellitaire","Satellite imagery","N"),("Logiciel SIG","GIS software","N")],
  "Résolution (cm/pixel), surface, fréquence","Resolution (cm/pixel), area, frequency",
  "Autorisation de vol ; couverture nuageuse","Flight authorisation; cloud cover",
  "Autorisation CCAA","CCAA authorisation",["TS-02","TS-05"]),
 ("T8.3","Connectivité et réseaux","Connectivity and networks","P,N",["ALL"],"resister",
  [("Liaison GSM 4G","4G GSM link","N"),("Réseau LoRaWAN","LoRaWAN network","P"),("VSAT","VSAT","P"),("Wi-Fi industriel","Industrial Wi-Fi","P")],
  "Débit, portée, coût mensuel en FCFA","Bandwidth, range, monthly cost in FCFA",
  "Zones blanches rurales","Rural coverage gaps",
  "Homologation des équipements radio : ART, à vérifier","Radio equipment approval: ART, to be verified",["TS-02","TS-03"]),
 ("T8.4","Supervision, automatisation et tableaux de bord","Supervision, automation and dashboards","H,N",["DP3","ALL"],"transformer",
  [("Automate programmable","PLC","H"),("Supervision, IHM","SCADA, HMI","N"),("Variateurs","Variable-speed drives","H")],
  "Nombre d'entrées-sorties, cadence de rafraîchissement","I/O count, refresh rate",
  "Compétences locales ; dépendance au fournisseur","Local skills; vendor lock-in",
  "IEC 61131-3 (int.)","IEC 61131-3 (intl.)",["TS-03","TS-05","TS-07","TS-10"]),
 ("T8.5","Logiciels de gestion","Management software","N",["ALL"],"resister",
  [("Logiciel de gestion d'exploitation","Farm management software","N"),("Logiciel de coopérative","Cooperative management software","N"),("ERP agro-industriel","Agro-industrial ERP","N")],
  "Utilisateurs, modules, fonctionnement hors ligne","Users, modules, offline operation",
  "Abandon après déploiement ; hébergement ; licences","Abandonment after rollout; hosting; licences",
  "Protection des données : texte national à vérifier","Data protection: national text to be verified",["TS-01","TS-05","TS-06","TS-10"]),
 ("T8.6","Traçabilité et géolocalisation","Traceability and geolocation","H",["DP1","DP5","DP7"],"exporter",
  [("Géolocalisation des parcelles","Plot geolocation","H"),("Codes, QR, RFID","Codes, QR, RFID","H"),("Plateforme de traçabilité","Traceability platform","N")],
  "Parcelles, lots, granularité du suivi","Plots, batches, tracking granularity",
  "Exigence RDUE de géolocalisation des parcelles","EUDR plot geolocation requirement",
  "Règlement (UE) 2023/1115 ; ISO 22005, GS1 (int.)","Regulation (EU) 2023/1115; ISO 22005, GS1 (intl.)",["TS-01","TS-05","TS-07","TS-10"]),
 ("T8.7","Terminaux de terrain et interfaces de paiement","Field terminals and payment interfaces","H,N",["DP4","DP5"],"exporter",
  [("Tablette de collecte","Field data tablet","H"),("Imprimante d'étiquettes","Label printer","H"),("Interface de paiement mobile","Mobile money interface","N")],
  "Volume de transactions, mode hors ligne","Transaction volume, offline mode",
  "Réseau ; fraude ; frais de transaction","Network; fraud; transaction fees",
  "Intégration seulement ; le service relève de DS.S39","Integration only; the service belongs to DS.S39",["TS-03","TS-05","TS-10"]),
]
assert len(SF) == 50, len(SF)

VUES = {
  "produire": ("Produire pour la Demande", "Produce for Demand"),
  "transformer": ("Transformer pour la Valeur", "Transform for Value"),
  "exporter": ("Exporter pour l'Impact", "Export for Impact"),
  "resister": ("Résister pour la Durée", "Resist for Durability"),
}
PHASES = {"comprendre":("Comprendre","Understand"),"concevoir":("Concevoir","Design"),"realiser":("Réaliser","Deliver"),"perenniser":("Pérenniser","Sustain")}
DP = {"DP1":"Agriculture","DP2":"Élevage","DP3":"Transformation","DP4":"Logistique & Distribution","DP5":"Trading & Export","DP6":"Halieutique et aquacole","DP7":"Forestier","ALL":"Tous les maillons"}
DP_EN = {"DP1":"Agriculture","DP2":"Livestock","DP3":"Processing","DP4":"Logistics & Distribution","DP5":"Trading & Export","DP6":"Fisheries and aquaculture","DP7":"Forestry","ALL":"All links"}

def slug(s):
    s = s.lower()
    s = re.sub(r"[àâä]","a",s); s = re.sub(r"[éèêë]","e",s); s = re.sub(r"[îï]","i",s); s = re.sub(r"[ôö]","o",s); s = re.sub(r"[ùûü]","u",s); s = s.replace("ç","c")
    return re.sub(r"[^a-z0-9]+","-",s).strip("-")

def build(lang):
    fr = lang == "fr"
    dom_map = {d[0]: d for d in DOMAINES}
    domaines = []
    for code, nfr, nen, sfr, sen in DOMAINES:
        domaines.append({"code": code, "nom": nfr if fr else nen, "slug": sfr if fr else sen, "transversal": code in TRANSVERSAL, "sousFonctions": []})
    dom_idx = {d["code"]: d for d in domaines}
    for row in SF:
        code, nfr, nen, types, maillons, vue, eq, gfr, gen, rfr, ren, nofr, noen, services = row
        name = nfr if fr else nen
        d = dom_idx[code.split(".")[0]]
        equipements = []
        for i, (efr, een, t) in enumerate(eq, 1):
            equipements.append({"code": f"{code}-{i:02d}", "nom": efr if fr else een, "type": t})
        d["sousFonctions"].append({
            "code": code, "nom": name, "slug": f"{code.lower().replace('.', '-')}-{slug(name)}",
            "types": types.split(","),
            "maillons": maillons, "maillonsLibelles": [(DP if fr else DP_EN)[m] for m in maillons],
            "vue": vue, "vueLibelle": VUES[vue][0 if fr else 1],
            "equipements": equipements,
            "grandeurs": gfr if fr else gen,
            "risques": rfr if fr else ren,
            "normes": nofr if fr else noen,
            "servicesCles": services,
        })
    services = []
    for code, nfr, nen, lfr, len_, dfr, den, phase, xpn in SERVICES:
        services.append({"code": code, "nom": nfr if fr else nen, "slug": f"{code.lower()}-{slug(nfr if fr else nen)}",
                         "livrables": lfr if fr else len_, "dureeIndicative": dfr if fr else den,
                         "phase": phase, "phaseLibelle": PHASES[phase][0 if fr else 1], "prestationsAgrovita": xpn})
    cv = [{"code": c, "nom": nfr if fr else nen} for c, nfr, nen in CYCLE_VIE]
    return {
        "referentiel": "RT-TECH", "version": VERSION, "dateValidation": DATE, "langue": lang,
        "doctrine": {"signature": "De l'équipement à la performance." if fr else "From equipment to performance.",
                     "perimetre": "Ingénierie seule : XP-NOVA spécifie, compare, vérifie et assiste la réception ; il ne fournit, n'installe, ne maintient ni ne certifie." if fr else
                                  "Engineering only: XP-NOVA specifies, compares, verifies and supports acceptance; it does not supply, install, maintain or certify."},
        "types": [{"code":"P","nom":"Physique" if fr else "Physical"},{"code":"N","nom":"Numérique" if fr else "Digital"},{"code":"H","nom":"Hybride" if fr else "Hybrid"}],
        "vues": [{"code": k, "nom": v[0 if fr else 1]} for k, v in VUES.items()],
        "maillons": [{"code": k, "nom": v} for k, v in (DP if fr else DP_EN).items() if k != "ALL"],
        "domaines": domaines, "services": services, "cycleDeVie": cv,
        "compteurs": {"domaines": len(domaines), "sousFonctions": 50, "services": len(services), "combinaisons": 50 * len(services)},
    }

os.makedirs("data", exist_ok=True)
for lang in ("fr", "en"):
    with open(f"data/rt-tech.{lang}.json", "w", encoding="utf-8") as f:
        json.dump(build(lang), f, ensure_ascii=False, indent=2)

with open("data/sous-fonctions.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f, delimiter=";")
    w.writerow(["code","domaine","sous_fonction_fr","sous_fonction_en","types","maillons","vue","grandeurs","risques_cameroun","normes","services_cles"])
    for r in SF:
        w.writerow([r[0], r[0].split(".")[0], r[1], r[2], r[3], " ".join(r[4]), r[5], r[7], r[9], r[11], " ".join(r[13])])

with open("data/equipements.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f, delimiter=";")
    w.writerow(["code","sous_fonction","equipement_fr","equipement_en","type"])
    n = 0
    for r in SF:
        for i, (efr, een, t) in enumerate(r[6], 1):
            w.writerow([f"{r[0]}-{i:02d}", r[0], efr, een, t]); n += 1
print("OK — 50 sous-fonctions,", n, "équipements types,", len(SERVICES), "services")

# ---------- Matrice filières × sous-fonctions (lot validé le 21/10/2026) ----------
# 29 filières AGROVITA (codes FV/FA/FH/FF du site agrovita.xp-nova.com/filieres).
# Niveau : 3 = essentiel (presque tout projet de la filière), 2 = fréquent, 1 = occasionnel.
FILIERES = [
 ("FV01","Cultures de rente","Cash crops","DP1"),("FV02","Cultures vivrières","Food crops","DP1"),("FV03","Filière maraîchère","Market gardening","DP1"),
 ("FV04","Fruits tropicaux","Tropical fruits","DP1"),("FV05","Huiles et oléagineux","Oils and oilseeds","DP1"),("FV06","Plantes médicinales","Medicinal plants","DP1"),
 ("FV07","Plantes aromatiques et épices","Aromatic plants and spices","DP1"),("FV08","Semencière","Seed production","DP1"),("FV09","Floricole et horticulture ornementale","Floriculture and ornamental horticulture","DP1"),
 ("FA01","Volailles","Poultry","DP2"),("FA02","Porcins","Pigs","DP2"),("FA03","Caprins et ovins","Goats and sheep","DP2"),("FA04","Bovins (viande et lait)","Cattle (meat and dairy)","DP2"),
 ("FA05","Apicole","Beekeeping","DP2"),("FA06","Cunicole","Rabbit farming","DP2"),("FA07","Équine et asine","Horses and donkeys","DP2"),("FA08","Cynégétique et élevage de gibier","Game farming","DP2"),("FA09","Hélicicole","Snail farming","DP2"),
 ("FH01","Aquaculture","Aquaculture","DP6"),("FH02","Halieutique marine","Marine fisheries","DP6"),("FH03","Halieutique continentale","Inland fisheries","DP6"),
 ("FF01","Bois d'œuvre et de service","Timber and service wood","DP7"),("FF02","Miel forestier sauvage","Wild forest honey","DP7"),("FF03","Fruits, graines et oléagineux sauvages","Wild fruits, seeds and oilseeds","DP7"),
 ("FF04","Champignons et insectes comestibles","Edible mushrooms and insects","DP7"),("FF05","Boissons fermentées de sève","Fermented sap beverages","DP7"),("FF06","PFNL non alimentaires","Non-food NTFPs","DP7"),
 ("FF07","Bambou","Bamboo","DP7"),("FF08","Reboisement, foresterie communautaire et carbone","Reforestation, community forestry and carbon","DP7"),
]
assert len(FILIERES) == 29

# Transversaux appliqués à toutes les filières (niveau 2 sauf précision)
TRANSVERSAL = {"T6.1":2,"T6.2":2,"T6.3":2,"T8.1":1,"T8.3":1,"T8.5":2,"T8.7":1,"T7.3":2,"T7.5":1}

M = {
 "FV01": {"T1.1":2,"T1.3":3,"T1.4":3,"T1.6":2,"T2.4":1,"T4.4":3,"T4.8":2,"T5.1":3,"T5.2":3,"T7.1":1,"T7.4":3,"T7.6":3,"T8.2":2,"T8.6":3,"T8.4":1},
 "FV02": {"T1.1":3,"T1.2":3,"T1.3":2,"T1.4":3,"T1.6":3,"T2.2":2,"T2.5":2,"T4.1":2,"T4.2":3,"T4.3":2,"T4.4":3,"T4.6":1,"T4.8":2,"T5.1":3,"T5.2":3,"T7.1":2,"T7.6":2,"T8.2":1},
 "FV03": {"T1.1":2,"T1.2":2,"T1.3":3,"T2.1":3,"T2.2":3,"T2.3":2,"T2.4":3,"T2.5":2,"T3.1":3,"T3.2":2,"T4.1":2,"T4.8":2,"T5.3":3,"T5.4":2,"T5.5":2,"T7.4":3,"T8.1":2,"T8.6":1},
 "FV04": {"T1.1":2,"T1.3":2,"T2.2":2,"T2.4":2,"T3.1":1,"T4.1":2,"T4.3":2,"T4.4":3,"T4.5":2,"T4.8":3,"T5.3":3,"T5.4":2,"T5.5":2,"T7.4":3,"T7.6":2,"T8.6":2},
 "FV05": {"T1.1":2,"T1.4":3,"T4.1":2,"T4.2":2,"T4.3":3,"T4.4":2,"T4.5":2,"T4.8":3,"T4.9":2,"T5.1":2,"T6.5":2,"T6.6":2,"T7.1":2,"T8.4":1},
 "FV06": {"T1.3":1,"T2.4":2,"T3.1":2,"T3.2":2,"T4.1":2,"T4.2":2,"T4.3":2,"T4.4":3,"T4.8":3,"T4.9":2,"T5.1":2,"T8.6":2},
 "FV07": {"T1.3":1,"T2.4":2,"T3.1":1,"T4.1":2,"T4.2":2,"T4.3":2,"T4.4":3,"T4.8":3,"T4.9":2,"T5.1":2,"T7.4":2,"T8.6":2},
 "FV08": {"T1.2":3,"T1.3":2,"T1.4":3,"T2.4":2,"T3.1":2,"T3.2":2,"T4.1":3,"T4.4":3,"T4.8":3,"T5.1":3,"T5.2":3,"T5.3":2,"T8.6":2},
 "FV09": {"T2.2":2,"T2.4":3,"T3.1":3,"T3.2":3,"T4.8":2,"T5.3":2,"T5.4":2,"T8.1":2},
 "FA01": {"T1.5":2,"T2.6":3,"T3.3":3,"T3.4":3,"T4.6":3,"T4.7":2,"T4.8":2,"T4.9":2,"T5.3":2,"T6.3":3,"T6.4":2,"T8.1":2,"T8.4":2},
 "FA02": {"T1.5":2,"T2.6":3,"T3.3":3,"T4.6":3,"T4.7":2,"T4.8":1,"T5.3":2,"T6.4":3,"T6.6":2,"T8.1":1},
 "FA03": {"T1.5":3,"T2.1":2,"T2.3":2,"T2.6":2,"T3.3":2,"T4.6":2,"T4.7":2,"T5.3":1,"T6.4":1},
 "FA04": {"T1.5":3,"T2.1":2,"T2.3":2,"T2.6":3,"T3.3":2,"T4.5":2,"T4.6":2,"T4.7":2,"T4.9":2,"T5.3":2,"T5.4":3,"T6.3":2,"T6.4":2,"T8.1":1},
 "FA05": {"T3.3":3,"T4.3":2,"T4.8":3,"T4.9":1,"T5.1":2,"T7.4":1,"T8.6":2},
 "FA06": {"T2.6":2,"T3.3":3,"T4.6":2,"T4.7":2,"T5.3":2},
 "FA07": {"T1.5":2,"T2.6":2,"T3.3":2,"T7.5":1},
 "FA08": {"T2.6":2,"T3.3":2,"T4.6":1,"T4.7":2,"T5.3":2,"T8.6":1},
 "FA09": {"T2.6":2,"T3.2":2,"T3.3":2,"T4.5":1,"T4.8":2,"T5.3":2},
 "FH01": {"T2.1":3,"T2.2":3,"T2.3":2,"T2.6":3,"T3.5":3,"T4.4":2,"T4.6":3,"T4.8":2,"T5.3":2,"T5.5":3,"T6.3":3,"T8.1":2,"T8.4":2},
 "FH02": {"T4.4":3,"T4.8":2,"T4.9":2,"T5.3":3,"T5.4":3,"T5.5":3,"T7.3":2,"T7.6":2,"T8.6":2},
 "FH03": {"T4.4":3,"T4.8":2,"T5.3":2,"T5.4":2,"T5.5":3,"T7.6":2},
 "FF01": {"T1.1":2,"T1.6":2,"T4.2":3,"T4.4":3,"T7.1":2,"T7.2":3,"T7.5":3,"T8.2":2,"T8.6":3},
 "FF02": {"T4.3":2,"T4.8":3,"T4.9":1,"T5.1":2,"T8.6":2},
 "FF03": {"T4.1":2,"T4.3":3,"T4.4":3,"T4.8":2,"T5.1":2,"T7.6":2,"T8.6":2},
 "FF04": {"T3.2":2,"T4.1":2,"T4.4":3,"T4.8":3,"T4.9":2,"T5.3":2},
 "FF05": {"T4.5":2,"T4.8":3,"T4.9":2,"T5.3":2},
 "FF06": {"T4.2":2,"T4.3":2,"T4.4":2,"T4.8":2,"T7.6":2,"T8.6":1},
 "FF07": {"T1.1":1,"T4.2":2,"T4.4":2,"T6.4":1,"T7.2":2,"T7.5":2},
 "FF08": {"T1.1":2,"T1.2":2,"T2.2":1,"T3.2":3,"T8.1":2,"T8.2":3,"T8.6":3},
}
CODES = {r[0] for r in SF}
for f, d in M.items():
    for c in d: assert c in CODES, (f, c)

def build_matrice():
    out = []
    for code, nfr, nen, dp in FILIERES:
        base = dict(TRANSVERSAL); base.update(M[code])
        out.append({"code": code, "nom": nfr, "nomEn": nen, "maillon": dp, "slug": code.lower(),
                    "sousFonctions": [{"code": c, "niveau": n} for c, n in sorted(base.items())]})
    return out

for lang in ("fr", "en"):
    p = f"data/rt-tech.{lang}.json"
    d = json.load(open(p, encoding="utf-8"))
    d["filieres"] = build_matrice()
    d["compteurs"]["filieres"] = 29
    json.dump(d, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
with open("data/matrice-filieres.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f, delimiter=";")
    w.writerow(["filiere"] + [r[0] for r in SF])
    for fl in build_matrice():
        niv = {x["code"]: x["niveau"] for x in fl["sousFonctions"]}
        w.writerow([fl["code"]] + [niv.get(r[0], "") for r in SF])
print("Matrice : 29 filières,", sum(len(f["sousFonctions"]) for f in build_matrice()), "couples")
