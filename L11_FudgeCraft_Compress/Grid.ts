namespace L11_FudgeCraft_Compress {
    export interface Move {
        value: number;
        target: ƒ.Vector3;
        element: GridElement;
    }

    export class GridElement {
        public cube: Cube;

        constructor(_cube: Cube = null) {
            this.cube = _cube;
        }

        get position(): ƒ.Vector3 {
            if (this.cube)
                return this.cube.cmpTransform.local.translation;
            return null;
        }

        set position(_new: ƒ.Vector3) {
            if (this.cube)
                this.cube.cmpTransform.local.translation = _new;
        }
    }

    export class Grid extends Map<string, GridElement> {
        // private grid: Map<string, Cube> = new Map();
        constructor() {
            super();
        }

        public push(_position: ƒ.Vector3, _element: GridElement = null): void {
            let key: string = this.toKey(_position);
            if (this.pop(_position))
                ƒ.Debug.warn("Grid push to occupied position, popped: ", key);
            this.set(key, _element);
            if (_element)
                game.appendChild(_element.cube);
        }

        public pull(_position: ƒ.Vector3): GridElement {
            let key: string = this.toKey(_position);
            let element: GridElement = this.get(key);
            return element;
        }

        public pop(_position: ƒ.Vector3): GridElement {
            let key: string = this.toKey(_position);
            let element: GridElement = this.get(key);
            this.delete(key);
            if (element)
                game.removeChild(element.cube);
            return element;
        }

        public findNeighbors(_of: ƒ.Vector3, _empty: boolean = false): GridElement[] | ƒ.Vector3[] {
            let found: GridElement[] = [];
            let empty: ƒ.Vector3[] = [];
            let offsets: number[][] = [[0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0]];
            for (let offset of offsets) {
                let posNeighbor: ƒ.Vector3 = ƒ.Vector3.SUM(_of, new ƒ.Vector3(...offset));
                let neighbor: GridElement = grid.pull(posNeighbor);
                if (neighbor)
                    found.push(neighbor);
                else
                    empty.push(posNeighbor);
            }
            return _empty ? empty : found;
        }

        public compress(): Move[] {
            let movesGain: Move[] = [];
            for (let element of this) {
                let emptySpaces: ƒ.Vector3[] = <ƒ.Vector3[]>this.findNeighbors(element[1].position, true);
                for (let target of emptySpaces) {
                    let relativeGain: number = element[1].position.magnitude / target.magnitude;
                    if (relativeGain > 1) {
                        let move: Move = { value: relativeGain, target: target, element: element[1] };
                        movesGain.push(move);
                    }
                }
            }

            movesGain.sort((_a: Move, _b: Move) => _a.value < _b.value ? 1 : -1);

            let movesChosen: Move[] = [];
            for (let move of movesGain) {
                let alreadyChosen: number = movesChosen.findIndex((_move: Move) => _move.target.equals(move.target) || _move.element == move.element);
                if (alreadyChosen == -1)
                    movesChosen.push(move);
            }

            return movesChosen;
        }

        private toKey(_position: ƒ.Vector3): string {
            let position: ƒ.Vector3 = _position.map(Math.round);
            let key: string = position.toString();
            return key;
        }
    }
}