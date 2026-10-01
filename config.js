const EVENT = {
  id: "UFC332",
  titleLine1: "UFC",
  titleLine2: "332",
  matchupLabel: "Silva x Wang",
  venue: "Delta Center, Salt Lake City",
  dateLabel: "3 de outubro",
  lockTimestamp: "2026-10-03T20:00:00Z", // sábado 03/10, 17h de Brasília (início dos early prelims)
  deadlineLabel: "sábado (03/10), 17:00 (horário de Brasília)",
  prizeAmount: "R$30",
  adminPinHash: "a4c42a3f5f7103ddb1042c34864a1bd8e7854308d80ab8b4bf41eb46ad62b3dc",
  // LISTA DE E-MAILS AUTORIZADOS: só quem digitar um desses e-mails na tela de entrada acessa o site.
  // Maiúscula/minúscula não importa. Lista vazia = acesso liberado para todos.
  allowedEmails: [
    "teste@email.com"
  ],
  fights: [
    { id:"f1",  title:true,  weight:"Peso-Mosca (F) (Título)", a:{name:"Natália Silva", rec:"20-5-1"},       b:{name:"Wang Cong", rec:"10-1"} },
    { id:"f2",  title:false, weight:"Peso-Galo (Co-Main)",     a:{name:"Deiveson Figueiredo", rec:"25-7-1"}, b:{name:"Payton Talbott", rec:"11-1"} },
    { id:"f3",  title:false, weight:"Peso-Leve",               a:{name:"King Green", rec:"36-17-1"},         b:{name:"Esteban Ribovics", rec:"16-3"} },
    { id:"f4",  title:false, weight:"Meio-Médio",              a:{name:"Roberto Soldić", rec:"21-4"},        b:{name:"Khaos Williams", rec:"16-5"} },
    { id:"f5",  title:false, weight:"Peso-Médio",              a:{name:"Ateba Gautier", rec:"11-1"},         b:{name:"Roman Kopylov", rec:"15-5"} },
    { id:"f6",  title:false, weight:"Peso-Mosca",              a:{name:"Imanol Rodríguez", rec:"7-0"},       b:{name:"Alden Coria", rec:"13-3"} },
    { id:"f7",  title:false, weight:"Peso-Médio",              a:{name:"Damian Pinas", rec:"10-1"},          b:{name:"Andrey Pulyaev", rec:"10-5"} },
    { id:"f15", title:false, weight:"Peso-Galo",               a:{name:"Marcus McGhee", rec:"11-2"},         b:{name:"Anthony Romero", rec:"7-2"} },
    { id:"f9",  title:false, weight:"Peso-Pesado",             a:{name:"Anthony Wint", rec:"8-0"},           b:{name:"Lucas Armand", rec:"6-0"} },
    { id:"f10", title:false, weight:"Peso-Pesado",             a:{name:"Johnny Walker", rec:"22-10"},        b:{name:"Mick Parkin", rec:"10-1"} },
    { id:"f11", title:false, weight:"Peso-Leve",               a:{name:"Rafael dos Anjos", rec:"32-17"},     b:{name:"Alexander Hernandez", rec:"18-9"} },
    { id:"f12", title:false, weight:"Peso-Médio",              a:{name:"Marvin Vettori", rec:"19-9-1"},      b:{name:"Ismail Naurdiev", rec:"25-8"} },
    { id:"f14", title:false, weight:"Meio-Médio",              a:{name:"Jacobe Smith", rec:"12-0"},          b:{name:"Bruce Whitehead", rec:"8-2"} },
    { id:"f13", title:false, weight:"Meio-Médio",              a:{name:"Court McGee", rec:"22-14"},          b:{name:"Eric Nolan", rec:"8-5"} }
  ]
};
