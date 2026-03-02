export interface Laudo {
  numero: number;
  data: string;
  veiculo: string;
  placa: string;
  km: number;
  tipo: string;
  resultado: "APROVADO" | "REPROVADO";
  url?: string;
}

export const SYSCON_BASE_URL = "https://customer.sysconweb.com.br/bb94545f-9d9f-4bb5-bd72-284e4bc5faff";

export const laudosData: Laudo[] = [
  { numero: 131, data: "04/02/2026", veiculo: "SCANIA / G 360 A 4X2 XT CS DC09 144", placa: "SUP5F35", km: 34236, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO", url: "https://customer.sysconweb.com.br/bb94545f-9d9f-4bb5-bd72-284e4bc5faff/test-details/6F9A067B-20B9-4412-891B-338177616755" },
  { numero: 130, data: "12/12/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GJN2G43", km: 2446153, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 129, data: "12/12/2025", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "FCN8G78", km: 3925975, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 128, data: "12/12/2025", veiculo: "MERCEDES-BENZ / 2726 6x4 OM 906 LA.III/25", placa: "EDL2449", km: 2257046, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 127, data: "12/12/2025", veiculo: "MERCEDES-BENZ / ATRON 2324 OM 926 LA.V/21", placa: "FNM0361", km: 1044541, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 126, data: "12/12/2025", veiculo: "MERCEDES-BENZ / ACCELO 1016 OM 924 LA.V/22", placa: "FLX0881", km: 4548580, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 125, data: "10/12/2025", veiculo: "MERCEDES-BENZ / ATRON 2729 6X4 OM 926 LA.V/24", placa: "FST8B43", km: 1307803, tipo: "Relatório simplificado de Fumaça", resultado: "REPROVADO" },
  { numero: 124, data: "10/12/2025", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "FJZ9E49", km: 3199827, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 123, data: "10/12/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GKB6H51", km: 2670760, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 122, data: "10/12/2025", veiculo: "SCANIA / 560 G XT SUPER", placa: "GJY1D11", km: 146609, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 121, data: "10/12/2025", veiculo: "MERCEDES-BENZ / ATRON 2729 6X4 OM 926 LA.V/24", placa: "FFR5D94", km: 5537107, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 120, data: "10/12/2025", veiculo: "MERCEDES-BENZ / 2726 6x4 OM 906 LA.III/25", placa: "EDL2072", km: 2259149, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 119, data: "10/12/2025", veiculo: "MERCEDES-BENZ / 2726 6x4 OM 906 LA.III/25", placa: "EDL2287", km: 2632159, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 118, data: "10/12/2025", veiculo: "MERCEDES-BENZ / 2726 6x4 OM 906 LA.III/25", placa: "EDL2A31", km: 2478380, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 117, data: "01/12/2025", veiculo: "MERCEDES-BENZ / 2726 6x4 OM 906 LA.III/25", placa: "EDL2E48", km: 232247, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 116, data: "01/12/2025", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "GJU7J65", km: 165446, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 115, data: "01/12/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "FFR5J02", km: 162249, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 114, data: "01/12/2025", veiculo: "MERCEDES-BENZ / ATRON 2729 6X4 OM 926 LA.V/24", placa: "FFR5D97", km: 445388, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 113, data: "28/11/2025", veiculo: "MERCEDES-BENZ / 1418 R OM 366 A", placa: "KVN3448", km: 791099, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 112, data: "28/11/2025", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "GIR8J69", km: 376880, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 111, data: "27/11/2025", veiculo: "SCANIA / 560 G XT SUPER", placa: "FHQ8G14", km: 120064, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 110, data: "27/11/2025", veiculo: "MERCEDES-BENZ / 2726 6x4 OM 906 LA.III/25", placa: "EDL2E52", km: 323653, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 109, data: "25/11/2025", veiculo: "MERCEDES-BENZ / ONIBUS OF 1418 OM 904 LA.III/22", placa: "KVO2866", km: 224578, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 108, data: "25/11/2025", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "GJH7722", km: 278865, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 107, data: "25/11/2025", veiculo: "MERCEDES-BENZ / ATEGO 1719 CE OM 924 LA.V/23", placa: "FVJ4D66", km: 140446, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 106, data: "25/11/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GFE5G12", km: 222525, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 105, data: "25/11/2025", veiculo: "MERCEDES-BENZ / AXOR 3344K6X4 OM 457 LA.V/27", placa: "GJZ5B66", km: 223227, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 104, data: "25/11/2025", veiculo: "MERCEDES-BENZ / ATRON 2729 6X4 OM 926 LA.V/24", placa: "FFR5402", km: 436319, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 103, data: "25/11/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "FLM7I54", km: 683166, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 102, data: "25/11/2025", veiculo: "MERCEDES-BENZ / ATRON 2729 6X4 OM 926 LA.V/24", placa: "FFR5E01", km: 534590, tipo: "Relatório simplificado de Fumaça", resultado: "REPROVADO" },
  { numero: 101, data: "24/11/2025", veiculo: "SCANIA / 560 G XT SUPER", placa: "STT7E30", km: 120944, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 100, data: "24/11/2025", veiculo: "SCANIA / 560 G XT SUPER", placa: "SWA6D30", km: 128030, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 99, data: "24/11/2025", veiculo: "SCANIA / 560 G XT SUPER", placa: "SVR3J13", km: 114367, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 98, data: "24/11/2025", veiculo: "SCANIA / 560 G XT SUPER", placa: "TLF7H73", km: 62978, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 97, data: "24/11/2025", veiculo: "SCANIA / 560 G XT SUPER", placa: "TLE4G23", km: 61967, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 96, data: "24/11/2025", veiculo: "SCANIA / 560 G XT SUPER", placa: "STI6I38", km: 123520, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 95, data: "24/11/2025", veiculo: "SCANIA / 560 G XT SUPER", placa: "SUH5H99", km: 123781, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 94, data: "24/11/2025", veiculo: "SCANIA / 560 G XT", placa: "GHA4G82", km: 166618, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 93, data: "24/11/2025", veiculo: "SCANIA / 560 G XT SUPER", placa: "TLI1E08", km: 60107, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 92, data: "24/11/2025", veiculo: "SCANIA / 560 G XT SUPER", placa: "TLB1J73", km: 59364, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 91, data: "24/11/2025", veiculo: "SCANIA / 560 G XT SUPER", placa: "SUL6A46", km: 112132, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 90, data: "17/11/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "CUH2I68", km: 211980, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 89, data: "17/11/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "FFR5D96", km: 447811, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 88, data: "17/11/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "FNM0C86", km: 905868, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 87, data: "17/11/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GEO4G82", km: 197924, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 86, data: "17/11/2025", veiculo: "SCANIA / 560 G XT SUPER", placa: "SUI1G90", km: 134805, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 85, data: "17/11/2025", veiculo: "SCANIA / 560 G XT", placa: "FZA3G83", km: 143217, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 84, data: "17/11/2025", veiculo: "SCANIA / 560 G XT", placa: "TLD6H39", km: 39756, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 83, data: "17/11/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "CUL7D28", km: 159646, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 82, data: "14/11/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GGA3J64", km: 23127, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 81, data: "01/10/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GFJ3C84", km: 213724, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 80, data: "01/10/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GDN1I63", km: 222903, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 79, data: "01/10/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GFE5G12", km: 216790, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 78, data: "01/10/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GHU7A75", km: 510864, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 77, data: "01/10/2025", veiculo: "MERCEDES-BENZ / ATRON 2729 6X4 OM 926 LA.V/24", placa: "FFR5E04", km: 614950, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 76, data: "01/10/2025", veiculo: "MERCEDES-BENZ / ACCELO 1016 OM 924 LA.V/22", placa: "GIS3I22", km: 106809, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 75, data: "01/10/2025", veiculo: "MERCEDES-BENZ / 1718 A OM 366 A", placa: "EDL2D10", km: 372505, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 74, data: "01/10/2025", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "GIK9E66", km: 374105, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 73, data: "01/10/2025", veiculo: "MERCEDES-BENZ / ATEGO 1719 CE OM 924 LA.V/23", placa: "DKU7F05", km: 149809, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 72, data: "29/09/2025", veiculo: "MERCEDES-BENZ / OF 1722", placa: "EJY7F35", km: 735652, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 71, data: "29/09/2025", veiculo: "MERCEDES-BENZ / 1718 M OM 904 LA.II/30", placa: "EDL2D11", km: 488304, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 70, data: "29/09/2025", veiculo: "SCANIA / P360 - 124", placa: "CQB2785", km: 848430, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 69, data: "29/09/2025", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "GIC1E14", km: 148075, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 68, data: "29/09/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GFV3J46", km: 171350, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 67, data: "29/09/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "FLM7I53", km: 662896, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 66, data: "29/09/2025", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "FXA7F96", km: 1234, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 65, data: "29/09/2025", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "GHA3IYY", km: 333333, tipo: "Relatório simplificado de Fumaça", resultado: "REPROVADO" },
  { numero: 64, data: "29/09/2025", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "GHA3I98", km: 34083, tipo: "Relatório simplificado de Fumaça", resultado: "REPROVADO" },
  { numero: 63, data: "11/07/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GJJ5J43", km: 158015, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 62, data: "08/07/2025", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GAI3B17", km: 176035, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 61, data: "08/09/2024", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "FJR2D33", km: 312019, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 60, data: "14/08/2024", veiculo: "MERCEDES-BENZ / ACCELO 1016 OM 924 LA.V/22", placa: "GII9H26", km: 50179, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 59, data: "14/08/2024", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "FFR5J02", km: 135297, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 58, data: "14/08/2024", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "FFR5903", km: 126207, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 57, data: "14/08/2024", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "FFR5D96", km: 417502, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 56, data: "14/08/2024", veiculo: "MERCEDES-BENZ / 2726 6x4 OM 906 LA.III/25", placa: "EDL2D06", km: 366647, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 55, data: "12/08/2024", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "FYN0H84", km: 447841, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 54, data: "12/08/2024", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GFE5G12", km: 129997, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 53, data: "12/08/2024", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "FLM7I47", km: 634947, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 52, data: "08/08/2024", veiculo: "MERCEDES-BENZ / ATEGO 2730 6X4/ OM 926 LA.V/24", placa: "FJZ9E49", km: 302595, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 51, data: "07/08/2024", veiculo: "VOLVO / VM 260 6X4 - MWM7A260", placa: "EDL0861", km: 617562, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 50, data: "07/08/2024", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "FLM7I49", km: 646563, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 49, data: "07/08/2024", veiculo: "VOLVO / VM 260 6X4 - MWM7A260", placa: "EDL0804", km: 492944, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 48, data: "07/08/2024", veiculo: "SCANIA / I/P 124 CA 6X 4NZ360 DSC12 02", placa: "CQB2821", km: 80932, tipo: "Relatório simplificado de Fumaça", resultado: "REPROVADO" },
  { numero: 46, data: "06/08/2024", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "FLM7I45", km: 674119, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 45, data: "06/08/2024", veiculo: "MERCEDES-BENZ / ONIBUS OF 1722 M OM 924 LA.III/22", placa: "HBZ2H60", km: 25156, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 44, data: "06/08/2024", veiculo: "MERCEDES-BENZ / ONIBUS OF 1418 OM 904 LA.III/22", placa: "KVN3448", km: 705773, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 43, data: "06/08/2024", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GKB6H51", km: 137709, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 41, data: "06/08/2024", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "FAF7J61", km: 501561, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 40, data: "02/08/2024", veiculo: "MERCEDES-BENZ / 2726 6x4 OM 906 LA.III/25", placa: "EDL2449", km: 206513, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 39, data: "02/08/2024", veiculo: "MERCEDES-BENZ / 2726 6x4 OM 906 LA.III/25", placa: "EDL2450", km: 177199, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 38, data: "02/08/2024", veiculo: "MERCEDES-BENZ / ATRON 2729 6X4 OM 926 LA.V/24", placa: "FFR5D99", km: 481032, tipo: "Relatório simplificado de Fumaça", resultado: "REPROVADO" },
  { numero: 37, data: "01/08/2024", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "CUH2I68", km: 112725, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 36, data: "01/08/2024", veiculo: "MERCEDES-BENZ / ATRON 2324 OM 926 LA.V/21", placa: "FNM0361", km: 990889, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 35, data: "01/08/2024", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "FLM7I46", km: 677902, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 34, data: "01/08/2024", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "DEI2C84", km: 109625, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 33, data: "31/07/2024", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GED9J06", km: 120770, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 32, data: "31/07/2024", veiculo: "SCANIA / R 113 E 6X4 360 DSC11 23", placa: "BLY6J82", km: 173894, tipo: "Relatório simplificado de Fumaça", resultado: "REPROVADO" },
  { numero: 31, data: "31/07/2024", veiculo: "MERCEDES-BENZ / ACCELO 815/CE OM 924 LA.V/21", placa: "EDL2313", km: 942902, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
  { numero: 30, data: "31/07/2024", veiculo: "MERCEDES-BENZ / AXOR 3344 K OM 457 LA.III/24", placa: "GIL7I31", km: 116560, tipo: "Relatório simplificado de Fumaça", resultado: "APROVADO" },
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
