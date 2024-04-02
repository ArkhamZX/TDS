import { Resolver, Mutation, Arg, ID } from 'type-graphql';
import  GraphQLUpload  from 'graphql-upload'; // Importa GraphQLUpload correctamente
import { User } from '../../entities/User';
import { createWriteStream } from 'fs'; // No es necesario importar 'node:fs'
import path from 'path';

@Resolver()
export class ProfileImageResolver {
  @Mutation(() => User)
  async uploadProfileImage(
    @Arg('image', () => GraphQLUpload) upload: any // Corrige el tipo de 'upload' a 'any'
  ): Promise<User> {
    const { createReadStream, filename } = await upload;

    // Aquí puedes realizar cualquier validación necesaria sobre el archivo

    // Guardar la imagen en el servidor
    const imagePath = path.join(__dirname, '..', 'uploads', filename);
    await new Promise((resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(imagePath))
        .on('finish', resolve)
        .on('error', reject)
    );

    // Actualizar el campo profileImage del usuario en la base de datos
    const user = await User.findOneOrFail({ where: { id: ID } }); // Corrige el uso de ID
    user.profileImage = imagePath;
    await user.save();

    return user;
  }
}
