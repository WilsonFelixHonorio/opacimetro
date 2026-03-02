export interface Laudo {
  numero: number;
  data: string;
  veiculo: string;
  placa: string;
  km: number;
  tipo: string;
  resultado: "APROVADO" | "REPROVADO";
}

// Dados extraídos da URL Syscon
export const laudosData: Laudo[] = [
  { numero: 131, data: "04/02/2026", veiculo: "SCANIA / G 360 A 4X2 XT CS DC09 144", placa: "sup5f35", km: 34236, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 130, data: "12/12/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "gjn2g43", km: 2446153, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 129, data: "12/12/2025", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "fcn8g78", km: 3925975, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 128, data: "12/12/2025", veiculo: "MERCEDES-BENZ / 2726 6x4 OM 906 LA.III/25", placa: "edl2449", km: 2257046, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 127, data: "12/12/2025", veiculo: "MERCEDES-BENZ / ATRON 2324 OM 926 LA.V/21", placa: "fnm0361", km: 1044541, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 126, data: "12/12/2025", veiculo: "MERCEDES-BENZ / ACCELO 1016 OM 924 LA.V/22", placa: "FLX0881", km: 4548580, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 125, data: "10/12/2025", veiculo: "MERCEDES-BENZ / ATRON 2729 6X4 OM 926 LA.V/24", placa: "FST8B43", km: 1307803, tipo: "Relatório simplificado de Fumaça", resultado: "REPROVADO" },
  { numero: 124, data: "10/12/2025", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "fjz9e49", km: 3199827, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 123, data: "10/12/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "gkb6h51", km: 2670760, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 122, data: "10/12/2025", veiculo: "SCANIA / 560 G XT SUPER", placa: "gjy1d11", km: 146609, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 121, data: "10/12/2025", veiculo: "MERCEDES-BENZ / ATRON 2729 6X4 OM 926 LA.V/24", placa: "ffr5d94", km: 5537107, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 120, data: "10/12/2025", veiculo: "MERCEDES-BENZ / 2726 6x4 OM 906 LA.III/25", placa: "edl2072", km: 2259149, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 119, data: "10/12/2025", veiculo: "MERCEDES-BENZ / 2726 6x4 OM 906 LA.III/25", placa: "edl2287", km: 2632159, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 118, data: "10/12/2025", veiculo: "MERCEDES-BENZ / 2726 6x4 OM 906 LA.III/25", placa: "EDL2A31", km: 2478380, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 117, data: "01/12/2025", veiculo: "MERCEDES-BENZ / 2726 6x4 OM 906 LA.III/25", placa: "EDL2E48", km: 232247, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 116, data: "01/12/2025", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "gju7j65", km: 165446, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 115, data: "01/12/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "ffr5j02", km: 162249, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 114, data: "01/12/2025", veiculo: "MERCEDES-BENZ / ATRON 2729 6X4 OM 926 LA.V/24", placa: "ffr5d97", km: 445388, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 113, data: "28/11/2025", veiculo: "MERCEDES-BENZ / 1418 R OM 366 A", placa: "kvn 3448", km: 791099, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 112, data: "28/11/2025", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "gir8j69", km: 376880, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 111, data: "27/11/2025", veiculo: "SCANIA / 560 G XT SUPER", placa: "fhq8g14", km: 120064, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 110, data: "27/11/2025", veiculo: "MERCEDES-BENZ / 2726 6x4 OM 906 LA.III/25", placa: "edl2e52", km: 323653, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 109, data: "25/11/2025", veiculo: "MERCEDES-BENZ / ONIBUS OF 1418 OM 904 LA.III/22", placa: "kvo2866", km: 224578, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 108, data: "25/11/2025", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "GJH7722", km: 278865, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 107, data: "25/11/2025", veiculo: "MERCEDES-BENZ / ATEGO 1719 CE OM 924 LA.V/23", placa: "FVJ4D66", km: 140446, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 106, data: "25/11/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "gfe5g12", km: 222525, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 105, data: "25/11/2025", veiculo: "MERCEDES-BENZ / AXOR 3344K6X4 OM 457 LA.V/27", placa: "GJZ5B66", km: 223227, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 104, data: "25/11/2025", veiculo: "MERCEDES-BENZ / ATRON 2729 6X4 OM 926 LA.V/24", placa: "FFR5402", km: 436319, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 103, data: "25/11/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "flm7i54", km: 683166, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 102, data: "25/11/2025", veiculo: "MERCEDES-BENZ / ATRON 2729 6X4 OM 926 LA.V/24", placa: "ffr5e01", km: 534590, tipo: "Relatório simplificado de Fumaça", resultado: "REPROVADO" },
];

export function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

export function getStats(laudos: Laudo[]) {
  const total = laudos.length;
  const aprovados = laudos.filter((l) => l.resultado === "APROVADO").length;
  const reprovados = laudos.filter((l) => l.resultado === "REPROVADO").length;
  const taxaAprovacao = total > 0 ? ((aprovados / total) * 100).toFixed(1) : "0";

  return { total, aprovados, reprovados, taxaAprovacao };
}

export function getLaudosPorMes(laudos: Laudo[]) {
  const meses: Record<string, { aprovados: number; reprovados: number }> = {};
  const nomesMeses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  laudos.forEach((l) => {
    const date = parseDate(l.data);
    const key = `${nomesMeses[date.getMonth()]}/${date.getFullYear()}`;
    if (!meses[key]) meses[key] = { aprovados: 0, reprovados: 0 };
    if (l.resultado === "APROVADO") meses[key].aprovados++;
    else meses[key].reprovados++;
  });

  return Object.entries(meses)
    .map(([mes, dados]) => ({ mes, ...dados }))
    .reverse();
}

export function getVeiculosPorMarca(laudos: Laudo[]) {
  const marcas: Record<string, number> = {};
  laudos.forEach((l) => {
    const marca = l.veiculo.split("/")[0].trim();
    marcas[marca] = (marcas[marca] || 0) + 1;
  });
  return Object.entries(marcas).map(([marca, total]) => ({ marca, total }));
}
