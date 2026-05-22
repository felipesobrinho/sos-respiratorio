export interface PainPoint {
  id: string;
  icon: string;
  text: string;
  subtext: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  type: "oil" | "method" | "safety" | "general";
  iconName: string;
}

export interface Bonus {
  id: string;
  title: string;
  originalPrice: string;
  description: string;
  tag: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatarSeed: string;
  text: string;
  ageOfChild: string;
  tags: string[];
}

export interface Objection {
  id: string;
  question: string;
  answer: string;
}

export const PAIN_POINTS: PainPoint[] = [
  {
    id: "nose",
    icon: "Frown",
    text: "Seu filho vive com o nariz escorrendo",
    subtext: "Dificuldade de respirar, irritação contínua e as trocas constantes de lenços que assam a pele sensível do bebê."
  },
  {
    id: "cough",
    icon: "Moon",
    text: "A tosse aparece principalmente à noite",
    subtext: "Aquele barulho que corta o coração das mães e impede que a criança (e você) consiga dormir em paz."
  },
  {
    id: "cycle",
    icon: "RefreshCw",
    text: "Parece melhorar e poucos dias depois começa tudo de novo",
    subtext: "O ciclo sem fim de cansaço e preocupação que drena a sua energia e a saúde do seu pequeno."
  },
  {
    id: "lost",
    icon: "AlertCircle",
    text: "Você fica perdida sem saber o que fazer nos primeiros sinais",
    subtext: "Bate aquela insegurança angustiante entre correr para o pronto-socorro ou dar mais um remédio sintético."
  },
  {
    id: "fear",
    icon: "ShieldAlert",
    text: "Sente medo de errar ao usar óleos essenciais",
    subtext: "Muitos boatos ou exageros na internet te deixam confusa sobre a dosagem segura e locais corretos de aplicação."
  },
  {
    id: "start",
    icon: "Play",
    text: "Quer ajudar seu filho mas não sabe por onde começar",
    subtext: "Precisa de uma orientação clara, validada e sem termos difíceis para aplicar com tranquilidade na sua rotina."
  }
];

export const COURSE_MODULES: CourseModule[] = [
  {
    id: "m1",
    title: "Introdução Simples aos Óleos Essenciais",
    description: "Desmistifique a aromaterapia. Entenda de forma descomplicada o que são, de onde vêm e por que funcionam de verdade na fisiologia infantil.",
    type: "general",
    iconName: "Sparkles"
  },
  {
    id: "m2",
    title: "Identificação dos Sintomas Respiratórios",
    description: "Aprenda a analisar os primeiros sinais do corpo da criança — tosse, secreção, esforço respiratório — com olhar de mãe atenta.",
    type: "general",
    iconName: "Activity"
  },
  {
    id: "m3",
    title: "🌿 Protocolo Especial para Tosse Seca",
    description: "Quais óleos utilizar, diluições precisas e métodos para acalmar a garganta irritada e devolver o sono tranquilo.",
    type: "oil",
    iconName: "Wind"
  },
  {
    id: "m4",
    title: "🌿 Protocolo para Tosse com Catarro",
    description: "Sinergias seguras que ajudam a fluidificar o muco e facilitar a expectoração natural sem sobrecarregar o corpinho do seu filho.",
    type: "oil",
    iconName: "Droplets"
  },
  {
    id: "m5",
    title: "🌿 Febre, Rinite e Nariz Entupido",
    description: "Alívio imediato da congestão nasal de forma natural, garantindo respiração limpa e controle seguro da temperatura.",
    type: "oil",
    iconName: "Thermometer"
  },
  {
    id: "m6",
    title: "🌿 Resfriado, Gripe e Dor de Garganta",
    description: "Atuação completa no combate aos agentes patógenos e alívio do desconforto na garganta do bebê.",
    type: "oil",
    iconName: "Heart"
  },
  {
    id: "m7",
    title: "Diluições Seguras por Faixa Etária",
    description: "A regra de ouro de gotas por ml. Tabela definitiva e à prova de erros para bebês, crianças pequenas e maiores.",
    type: "safety",
    iconName: "Calculator"
  },
  {
    id: "m8",
    title: "Como Montar Sinergias (Blends)",
    description: "O segredo de misturar os óleos certos para potencializar os resultados, criando sua própria farmácia natural.",
    type: "method",
    iconName: "Layers"
  },
  {
    id: "m9",
    title: "Locais Corretos de Aplicação",
    description: "Massagem no peito, sola dos pés, costas. Onde, quando e como massagear com segurança de acordo com a idade.",
    type: "method",
    iconName: "Fingerprint"
  },
  {
    id: "m10",
    title: "Tempo de Utilização e Observação",
    description: "Como monitorar as respostas da criança e saber quando ajustar as dosagens ou dar por encerrado o protocolo.",
    type: "safety",
    iconName: "Clock"
  },
  {
    id: "m11",
    title: "Fortalecimento da Imunidade",
    description: "O protocolo preventivo exclusivo para blindar a saúde respiratória antes mesmo que os primeiros resfriados comecem.",
    type: "general",
    iconName: "ShieldCheck"
  },
  {
    id: "m12",
    title: "Guia Detalhado de Óleos Essenciais",
    description: "Um mergulho essencial nos principais óleos seguros para uso pediátrico: Lavanda, Melaleuca, Camomila Romana e outros.",
    type: "general",
    iconName: "BookOpen"
  }
];

export const BONUSES: Bonus[] = [
  {
    id: "b1",
    title: "Protocolo de Controle da Febre",
    originalPrice: "R$ 47,00",
    description: "Aprenda a agir com segurança e serenidade nos picos de febre da criança, sabendo quando e como usar óleos essenciais para confortar e acalmar.",
    tag: "🎁 MAIS PEDIDO"
  },
  {
    id: "b2",
    title: "Informação Detalhada dos 10 Óleos Principais",
    originalPrice: "R$ 37,00",
    description: "Um manual digital prático de consulta rápida. Saiba tudo sobre a química segura, contraindicações e benefícios dos top 10 óleos de cuidados respiratórios.",
    tag: "🎁 ESSENCIAL"
  },
  {
    id: "b3",
    title: "Acompanhamento e Suporte na Plataforma",
    originalPrice: "R$ 97,00",
    description: "Não ande sozinha. Tire suas dúvidas diretamente embaixo das aulas. Miriam e sua equipe respondem pessoalmente cada uma de suas perguntas pelo período de 1 ano.",
    tag: "🎁 SUPORTE VIP"
  },
  {
    id: "b4",
    title: "20% de Desconto no Atendimento Individual",
    originalPrice: "R$ 60,00",
    description: "Desconto exclusivo para alunas no agendamento de uma consulta de Aromaterapia Infantil 100% personalizada e individual com a Miriam Nardin.",
    tag: "🎁 EXCLUSIVO"
  },
  {
    id: "b5",
    title: "Uso Consciente da Aromaterapia Infantil",
    originalPrice: "R$ 27,00",
    description: "Vídeo-aula sobre a mentalidade e postura da mãe consciente: como entender a individualidade física e emocional de cada filho.",
    tag: "🎁 COMPLEMENTO"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "Karina Medeiros",
    role: "Mãe do Theo (2 anos)",
    avatarSeed: "karina",
    text: "O Theo vivia com nariz escorrendo e a tosse noturna de rinite não deixava ninguém dormir. Depois que apliquei o protocolo de difusão e diluição segura que a Miriam ensina, ele dormiu a noite inteira. Parece mágica, mas é pura ciência natural!",
    ageOfChild: "Theo, 2 anos",
    tags: ["Nariz escorrendo", "Tosse noturna"]
  },
  {
    id: "t2",
    author: "Priscila Vasconcellos",
    role: "Mãe da Alice (4 anos) e Leo (8 meses)",
    avatarSeed: "priscila",
    text: "Eu morria de medo de usar óleo essencial e fazer mal pros meus filhos por causa de tanta informação exagerada na internet. O SOS Respiratório me deu a segurança que eu precisava. A tabela de diluição por idade vale muito mais que os R$37 investidos!",
    ageOfChild: "Alice (4a) e Leo (8m)",
    tags: ["Iniciante garantida", "Tabela de diluição"]
  },
  {
    id: "t3",
    author: "Juliana Castroneves",
    role: "Mãe do Bernardo (5 anos)",
    avatarSeed: "juliana",
    text: "Antes, ao menor sinal de espirro, eu já corria pro xarope da farmácia. Hoje meu filho tem uma imunidade muito mais forte e eu me sinto 100% autônoma para resolver os primeiros sintomas em casa de forma natural. É maravilhoso ter nossa farmácia natural!",
    ageOfChild: "Bernardo, 5 anos",
    tags: ["Autonomia em casa", "Fim do xarope químico"]
  },
  {
    id: "t4",
    author: "Amanda Ribeiro",
    role: "Mãe da Manuela (3 anos)",
    avatarSeed: "amanda",
    text: "Entrei pelo bônus do Protocolo de Febre e acabei devorando todo o treinamento. Explicação limpa, prática e direta ao ponto, sem enrolação. A Miriam é de uma delicadeza e profissionalismo ímpares. Recomendo para todas as mães!",
    ageOfChild: "Manuela, 3 anos",
    tags: ["Protocolo de febre", "Fácil aplicação"]
  }
];

export const OBJECTIONS: Objection[] = [
  {
    id: "obj1",
    question: "Mas eu nunca usei óleos essenciais, vou conseguir aplicar?",
    answer: "Com certeza! O treinamento foi totalmente moldado do absoluto zero, pensando justamente na mãe iniciante. Você aprenderá em vídeo-aulas muito curtas e diretas, com tabelas visuais que te dizem exatamente quantas gotas colocar e onde aplicar."
  },
  {
    id: "obj2",
    question: "E se eu tiver medo de errar na dosagem e fazer mal ao meu filho?",
    answer: "Esse é o maior medo das mães, e o nosso principal foco é a SEGURANÇA. Você vai receber tabelas exatas de diluição baseadas no peso e na faixa etária da criança (desde bebês de meses a crianças maiores). Seguindo as orientações, o risco de erro é nulo."
  },
  {
    id: "obj3",
    question: "Preciso ter algum tipo de experiência anterior com aromaterapia?",
    answer: "Não, nenhum. Você não precisa ler livros gigantescos de química de óleos. Nós mastigamos o conhecimento complexo e transformamos em receitas e protocolos práticos de aplicação imediata."
  },
  {
    id: "obj4",
    question: "O acesso ao curso é permanente? Como recebo as aulas?",
    answer: "O acesso é imediato! Assim que seu pagamento de R$37 for confirmado, você receberá um e-mail automático da Kiwify com seus dados de login. Você poderá assistir às aulas pelo celular, tablet ou computador, no seu próprio tempo, quantas vezes desejar."
  },
  {
    id: "obj5",
    question: "E se eu tiver dúvidas durante a aplicação dos protocolos nas crises?",
    answer: "Você nunca estará sozinha. Logo abaixo de cada aula há um campo de comentários exclusivo para alunas. A Miriam e a equipe técnica lêem e respondem às suas dúvidas diretamente no painel, dando o suporte que você precisa para se sentir segura."
  }
];
