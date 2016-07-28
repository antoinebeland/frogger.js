namespace Utils {

    declare var THREE: any;

    /**
     * Defines the available loaders.
     */
    export class Loader {

        /**
         * Loads an OBJ/MTL model based register the file name and the working directory. When the model is loaded
         * correctly, the callback specified is invoked.
         *
         * @param fileName              The name of the OBJ/MTL files.
         * @param workingDirectory      The working directory where to search the file.
         * @param callback              The callback to invoke when the model is loaded.
         */
        public static loadObjMtlModel(fileName: string, workingDirectory: string, callback: { (data?: THREE.Mesh): void }) {

            var self = this;

            let mtlLoader = new THREE.MTLLoader();
            mtlLoader.setPath(workingDirectory);
            mtlLoader.load(fileName + ".mtl", function(materials : any) {

                materials.preload();

                let objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath(workingDirectory);
                objLoader.load(fileName + ".obj", function (mesh : THREE.Mesh) {
                    callback(mesh);
                });
            });
        }
    }
}