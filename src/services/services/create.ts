import servicesDTO from "./servicesDTO";
import {
  findServicesBy,
  storeServices,
} from "@/repositories/ServicesRepositories";

export async function createService(data: servicesDTO) {
  const { name, value } = data;

  const hasService = await findServicesBy(name);

  if (hasService && hasService.name) {
    throw new Error("Esse serviço/produto já esta cadastrado!");
  }

  if (!name || !value) {
    throw new Error("Campos nome ou valor não podem estar vazios!");
  }

  return await storeServices(data);
}
