import Country from "../entities/country.entity";
import { QueryRunner, Repository, TableColumn } from "typeorm";
import datasource from "../db";

export default class CountryService {
  db: Repository<Country>;
  constructor() {
    this.db = datasource.getRepository(Country);
  }

  //lister tous les pays 
  async listCountry() {
    return this.db.find();
  }

  //prend en paramètre le code du pays et qui renvoie le pays en question
  async findCountryNameByCode(code: string ){
    const country = await this.db.findOneBy({code});
    return country ? country.name : null;
  }

  //créer un pays avec son  nom + son code + son emoji
  async createCountry({ code, name, emoji}: { code: string, name: string, emoji: string }) {
    const newCountry = this.db.create({ code, name, emoji });
    return await this.db.save(newCountry);
  }

  //supprimer un pays par l'id, mais avant créer la méthode findCountryById
  async findCountryById(id: string ){
    return await this.db.findOneBy({id});
  }

  async deleteCountry(id: string) {
    const country = (await this.findCountryById(id)) as Country;
    if (!country) {
      throw new Error("Le pays n'existe pas");
    }
    await this.db.remove(country);
    return { ...country, id };
  }

  //ajouter une colonne 
  async addColunmContinentCode(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("Continent code", new TableColumn({
      name: "continentCode",
      type: "varchar",
      length: "50",
      isNullable: true,
    }));

  // pour récuperer tous les pays d'un continent
  async getCountriesByContinent(continentCode: string) {
  return await this.db.find({ where: { continentCode } });
   }

  //autre méthode : modifier un pays
}

  
