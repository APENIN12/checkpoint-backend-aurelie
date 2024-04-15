import { Mutation, Query, Resolver } from "type-graphql";
import Country from "../entities/country.entity";
import CountryService from "../services/country.service";

@Resolver()
export default class CountryResolver {
   
    @Query(() => [Country])
    async countries() {
      return new CountryService().listCountry();
    }
    
    //trouver le pays par le code 
    @Query(() => String, { nullable: true })
    async countryNameByCode(code: string) {
      return new CountryService().findCountryNameByCode(code);
    }

    //ajouter un pays 
    @Mutation(() => Country)
    async createCountry(
      code: string,
      name: string,
      emoji: string
    ) {
      return new CountryService().createCountry({ code, name, emoji });
    }

    //supprimer un pays 
    @Mutation(() => Country)
  async deleteCountry(id: string) {
    return new CountryService().deleteCountry(id);
  }




}
