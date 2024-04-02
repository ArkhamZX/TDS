import { Resolver, Mutation, Arg } from 'type-graphql';
import GraphQLUpload  from 'graphql-upload';
import { User } from '../../entities/User';
import { UserService } from '../../services/UserService';
import { createWriteStream } from 'fs';
import path from 'path';

@Resolver()
export class ProfileImageResolver {
  constructor(private userService: UserService) {} // Inyecta el servicio UserService

  @Mutation(() => User)
  async uploadProfileImage(
    @Arg('image', () => GraphQLUpload) upload: any 
  ): Promise<User> {
    const { createReadStream, filename } = await upload;

    // Guardar la imagen en el servidor
    const imagePath = path.join(__dirname, '..', 'uploads', filename);
    await new Promise((resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(imagePath))
        .on('finish', resolve)
        .on('error', reject)
    );

    // Obtener el usuario por su id
    const user = await this.userService.getOne(filename);

    // Verificar si el usuario existe
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Actualizar el campo profileImage del usuario en la base de datos
    user.profileImage = imagePath;
    await this.userService.save(user); // Guarda el usuario actualizado en la base de datos

    return user;
  }
}
