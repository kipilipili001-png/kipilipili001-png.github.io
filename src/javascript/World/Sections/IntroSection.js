import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import helvetikerBoldFont from 'three/examples/fonts/helvetiker_bold.typeface.json'

export default class IntroSection
{
    constructor(_options)
    {
        // Options
        this.config = _options.config
        this.time = _options.time
        this.resources = _options.resources
        this.objects = _options.objects
        this.areas = _options.areas
        this.walls = _options.walls
        this.tiles = _options.tiles
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Set up
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false
        this.container.updateMatrix()

        this.setStatic()
        this.setInstructions()
        this.setOtherInstructions()
        this.setTitles()
        this.setTiles()
        this.setDikes()
    }

    setStatic()
    {
        this.objects.add({
            base: this.resources.items.introStaticBase.scene,
            collision: this.resources.items.introStaticCollision.scene,
            floorShadowTexture: this.resources.items.introStaticFloorShadowTexture,
            offset: new THREE.Vector3(0, 0, 0),
            mass: 0
        })
    }

    setInstructions()
    {
        this.instructions = {}

        /**
         * Arrows
         */
        this.instructions.arrows = {}

        // Label
        this.instructions.arrows.label = {}

        this.instructions.arrows.label.texture = this.config.touch ? this.resources.items.introInstructionsControlsTexture : this.resources.items.introInstructionsArrowsTexture
        this.instructions.arrows.label.texture.magFilter = THREE.NearestFilter
        this.instructions.arrows.label.texture.minFilter = THREE.LinearFilter

        this.instructions.arrows.label.material = new THREE.MeshBasicMaterial({ transparent: true, alphaMap: this.instructions.arrows.label.texture, color: 0xffffff, depthWrite: false, opacity: 0 })

        this.instructions.arrows.label.geometry = this.resources.items.introInstructionsLabels.scene.children.find((_mesh) => _mesh.name === 'arrows').geometry

        this.instructions.arrows.label.mesh = new THREE.Mesh(this.instructions.arrows.label.geometry, this.instructions.arrows.label.material)
        this.container.add(this.instructions.arrows.label.mesh)

        if(!this.config.touch)
        {
            // Keys
            this.instructions.arrows.up = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(0, 0, 0),
                rotation: new THREE.Euler(0, 0, 0),
                duplicated: true,
                shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0.2, alpha: 0.5 },
                mass: 1.5,
                soundName: 'brick'
            })
            this.instructions.arrows.down = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(0, - 0.8, 0),
                rotation: new THREE.Euler(0, 0, Math.PI),
                duplicated: true,
                shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0.2, alpha: 0.5 },
                mass: 1.5,
                soundName: 'brick'
            })
            this.instructions.arrows.left = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(- 0.8, - 0.8, 0),
                rotation: new THREE.Euler(0, 0, Math.PI * 0.5),
                duplicated: true,
                shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0.2, alpha: 0.5 },
                mass: 1.5,
                soundName: 'brick'
            })
            this.instructions.arrows.right = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(0.8, - 0.8, 0),
                rotation: new THREE.Euler(0, 0, - Math.PI * 0.5),
                duplicated: true,
                shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0.2, alpha: 0.5 },
                mass: 1.5,
                soundName: 'brick'
            })
        }
    }

    setOtherInstructions()
    {
        if(this.config.touch)
        {
            return
        }

        this.otherInstructions = {}
        this.otherInstructions.x = 16
        this.otherInstructions.y = - 2

        // Container
        this.otherInstructions.container = new THREE.Object3D()
        this.otherInstructions.container.position.x = this.otherInstructions.x
        this.otherInstructions.container.position.y = this.otherInstructions.y
        this.otherInstructions.container.matrixAutoUpdate = false
        this.otherInstructions.container.updateMatrix()
        this.container.add(this.otherInstructions.container)

        // Label
        this.otherInstructions.label = {}

        this.otherInstructions.label.geometry = new THREE.PlaneGeometry(6, 6, 1, 1)

        this.otherInstructions.label.texture = this.resources.items.introInstructionsOtherTexture
        this.otherInstructions.label.texture.magFilter = THREE.NearestFilter
        this.otherInstructions.label.texture.minFilter = THREE.LinearFilter

        this.otherInstructions.label.material = new THREE.MeshBasicMaterial({ transparent: true, alphaMap: this.otherInstructions.label.texture, color: 0xffffff, depthWrite: false, opacity: 0 })

        this.otherInstructions.label.mesh = new THREE.Mesh(this.otherInstructions.label.geometry, this.otherInstructions.label.material)
        this.otherInstructions.label.mesh.matrixAutoUpdate = false
        this.otherInstructions.container.add(this.otherInstructions.label.mesh)

        // Horn
        this.otherInstructions.horn = this.objects.add({
            base: this.resources.items.hornBase.scene,
            collision: this.resources.items.hornCollision.scene,
            offset: new THREE.Vector3(this.otherInstructions.x + 1.25, this.otherInstructions.y - 2.75, 0.2),
            rotation: new THREE.Euler(0, 0, 0.5),
            duplicated: true,
            shadow: { sizeX: 1.65, sizeY: 0.75, offsetZ: - 0.1, alpha: 0.4 },
            mass: 1.5,
            soundName: 'horn',
            sleep: false
        })
    }

    setTitles()
    {
        const fontLoader = new FontLoader()
        const font = fontLoader.parse(helvetikerBoldFont)

        // Reuse the existing pure-white material from the original intro letters
        let letterMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
        this.resources.items.introBBase.scene.traverse((_child) =>
        {
            if(_child.isMesh && _child.material)
            {
                letterMaterial = _child.material
            }
        })

        // Helper to build each 3D upright letter with a matching physics box
        const addWordRow = (_word, _centerX, _y, _size, _spacing) =>
        {
            const letters = _word.split('')
            const letterData = []
            let totalWidth = 0

            for(const _char of letters)
            {
                const geometry = new TextGeometry(_char, {
                    font: font,
                    size: _size,
                    depth: 0.45,
                    curveSegments: 6,
                    bevelEnabled: true,
                    bevelThickness: 0.04,
                    bevelSize: 0.03,
                    bevelSegments: 3
                })

                // Stand the letter upright along the Z axis and center its origin for Cannon.js
                geometry.rotateX(Math.PI * 0.5)
                geometry.computeBoundingBox()

                const box = geometry.boundingBox
                const width = box.max.x - box.min.x
                const depth = box.max.y - box.min.y
                const height = box.max.z - box.min.z

                geometry.translate(
                    - (box.min.x + width * 0.5),
                    - (box.min.y + depth * 0.5),
                    - (box.min.z + height * 0.5)
                )

                letterData.push({ geometry, width, depth, height })
                totalWidth += width + _spacing
            }

            totalWidth -= _spacing
            let currentX = _centerX - totalWidth * 0.5

            for(const _item of letterData)
            {
                const posX = currentX + _item.width * 0.5
                const posZ = _item.height * 0.5 + 0.05

                const baseScene = new THREE.Object3D()
                const baseMesh = new THREE.Mesh(_item.geometry, letterMaterial)
                baseScene.add(baseMesh)

                const collisionScene = new THREE.Object3D()
                const collisionGeometry = new THREE.BoxGeometry(_item.width, _item.depth, _item.height)
                const collisionMesh = new THREE.Mesh(collisionGeometry)
                collisionScene.add(collisionMesh)

                this.objects.add({
                    base: baseScene,
                    collision: collisionScene,
                    offset: new THREE.Vector3(posX, _y, posZ),
                    rotation: new THREE.Euler(0, 0, 0),
                    shadow: { sizeX: _item.width + 0.4, sizeY: 1.4, offsetZ: - _item.height * 0.5, alpha: 0.4 },
                    mass: 1.5,
                    soundName: 'brick'
                })

                currentX += _item.width + _spacing
            }
        }

        // First row: IBRAHIM | Second row: KIPILIPILI
        addWordRow('IBRAHIM', - 1.5, 4.2, 1.35, 0.35)
addWordRow('KIPILIPILI', - 1.5, 1.8, 1.25, 0.3)
// Keep the "CREATIVE DEVELOPER" subtitle pieces
this.objects.add({
base: this.resources.items.introCreativeBase.scene,
collision: this.resources.items.introCreativeCollision.scene,
offset: new THREE.Vector3(0, 0, 0),
rotation: new THREE.Euler(0, 0, 0.25),
shadow: { sizeX: 5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.3 },
mass: 1.5,
sleep: false,
soundName: 'brick'
})
this.objects.add({
base: this.resources.items.introDevBase.scene,
collision: this.resources.items.introDevCollision.scene,
offset: new THREE.Vector3(0, 0, 0),
rotation: new THREE.Euler(0, 0, 0),
shadow: { sizeX: 2.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.3 },
mass: 1.5,
soundName: 'brick'
})
}
setTiles()
{
this.tiles.add({
start: new THREE.Vector2(0, - 4.5),
delta: new THREE.Vector2(0, - 4.5)
})
}
setDikes()
{
this.dikes = {}
this.dikes.brickOptions = {
base: this.resources.items.brickBase.scene,
collision: this.resources.items.brickCollision.scene,
offset: new THREE.Vector3(0, 0, 0.1),
rotation: new THREE.Euler(0, 0, 0),
duplicated: true,
shadow: { sizeX: 1.2, sizeY: 1.8, offsetZ: - 0.15, alpha: 0.35 },
mass: 0.5,
soundName: 'brick'
}
this.walls.add({
object: this.dikes.brickOptions,
shape:
{
type: 'brick',
equilibrateLastLine: true,
widthCount: 5,
heightCount: 2,
position: new THREE.Vector3(this.x - 12, this.y - 13, 0),
offsetWidth: new THREE.Vector3(0, 1.05, 0),
offsetHeight: new THREE.Vector3(0, 0, 0.45),
randomOffset: new THREE.Vector3(0, 0, 0),
randomRotation: new THREE.Vector3(0, 0, 0.2)
}
})
this.walls.add({
object:
{
...this.dikes.brickOptions,
rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
},
shape:
{
type: 'brick',
equilibrateLastLine: true,
widthCount: 3,
heightCount: 2,
position: new THREE.Vector3(this.x + 8, this.y + 6, 0),
offsetWidth: new THREE.Vector3(1.05, 0, 0),
offsetHeight: new THREE.Vector3(0, 0, 0.45),
randomOffset: new THREE.Vector3(0, 0, 0),
randomRotation: new THREE.Vector3(0, 0, 0.2)
}
})
this.walls.add({
object: this.dikes.brickOptions,
shape:
{
type: 'brick',
equilibrateLastLine: false,
widthCount: 3,
heightCount: 2,
position: new THREE.Vector3(this.x + 9.9, this.y + 4.7, 0),
offsetWidth: new THREE.Vector3(0, - 1.05, 0),
offsetHeight: new THREE.Vector3(0, 0, 0.45),
randomOffset: new THREE.Vector3(0, 0, 0),
randomRotation: new THREE.Vector3(0, 0, 0.2)
}
})
this.walls.add({
object:
{
...this.dikes.brickOptions,
rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
},
shape:
{
type: 'brick',
equilibrateLastLine: true,
widthCount: 3,
heightCount: 2,
position: new THREE.Vector3(this.x + 18, this.y + 3.5, 0),
offsetWidth: new THREE.Vector3(1.05, 0, 0),
offsetHeight: new THREE.Vector3(0, 0, 0.45),
randomOffset: new THREE.Vector3(0, 0, 0),
randomRotation: new THREE.Vector3(0, 0, 0.2)
}
})
this.walls.add({
object: this.dikes.brickOptions,
shape:
{
type: 'brick',
equilibrateLastLine: false,
widthCount: 2,
heightCount: 2,
position: new THREE.Vector3(this.x + 19.9, this.y + 2.2, 0),
offsetWidth: new THREE.Vector3(0, - 1.05, 0),
offsetHeight: new THREE.Vector3(0, 0, 0.45),
randomOffset: new THREE.Vector3(0, 0, 0),
randomRotation: new THREE.Vector3(0, 0, 0.2)
}
})
}
}
