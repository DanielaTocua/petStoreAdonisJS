import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animal from 'App/Models/Animal';

export default class AnimalsController {
    public async getListarAnimales(): Promise<Animal[]> {
        const user = await Animal.all()
        return user;
    }

    public async setRegistrarAnimal({request, response}:HttpContextContract){
        const dataAnimal = request.only(['nombre_animal','especie','raza','genero','edad'])
        try{
            await Animal.create(dataAnimal)
            response.status(200).json({"msg":"Registro completado con exito"})
        } catch (e) {           
            response.status(500).json({"msg":"Error en el servidor"})
        }
    }

    public async buscarPorEspecie({request}: HttpContextContract){
        const especie = request.param('especie');
        const user = await Animal.query().where('especie',especie);
        return user;
     }
    
     public async buscarMenoresDe({request}: HttpContextContract){
        const edad = request.param('edad');
        const user = await Animal.query().where('edad','<',edad);
        return user;
     }

     public async actualizarAnimal({request}: HttpContextContract){
        const id = request.param('id');
        const animal = await Animal.findOrFail(id)
        const data = request.all();
        animal.nombre_animal = data.nombre_animal
        animal.especie = data.especie
        animal.raza = data.raza
        animal.genero = data.genero
        animal.edad = data.edad
        await animal.save()
        return {"msg": "Actualizado correctamente", "status": 200}
     }

     public async eliminarAnimal({request}:HttpContextContract){
        const id = request.param('id');
        await (await Animal.findOrFail(id)).delete()
        return {"msg": "Eliminado correctamente", "status": 200}
     }
}
