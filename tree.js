class Tree {
    constructor(nurikabe) {
        this.root = new Node(nurikabe, null);
    }
}

// const NodeStates = {
//     "inactive": 0,  // before solving here
//     "active": 1,    // during solving
//     "done": 2,      // solving exhausted, moved on to child nodes
//     "discarded": 3  // not a viable path
// }

class Node {
    constructor(nurikabe, parent) {
        this.nurikabe = nurikabe;  // this nodes nurikabe object
        this.parent = parent;
        this.children = new Array();  // holds all child nodes
        // this.state = NodeStates.inactive
        // this.guesses_sea = new Array();  // holds the guesses used when creating child node
        // this.guesses_island = new Array();
        this.guesses = new Array();

    }

    add_child_with_guess() {
        // create new node
        var child_node = new Node(_.cloneDeep(this.nurikabe), this)  // copy nurikabe, this node is the parent

        // // alternate adding sea or island as guess:
        // //  take next guess and add to childs nurikabe
        // if (this.guesses_island.length >= this.guesses_sea.length) {
        //     var guess = this.next_guess(this.guesses_sea)
        //     // if no guess is possible
        //     if (guess == null) {
        //         return null
        //     }
        //     this.guesses_sea.push(guess)

        //     child_node.nurikabe.sea.add_point(guess)
        // }
        // else {
        //     var guess = this.next_guess(this.guesses_island)
        //     // if no guess is possible
        //     if (guess == null) {
        //         return null
        //     }
        //     this.guesses_island.push(guess)

        //     child_node.nurikabe.unasigned_island_points.add_point(guess)
        // }

        // this.children.push(child_node)
        // return child_node
        var guess = this.next_guess(this.guesses)
        if (guess == null) {
            return null
        }
        this.guesses.push(guess)

        child_node.nurikabe.unasigned_island_points.add_point(guess)  // gets absorbed into island in first loop of try_strats

        return child_node
    }

    next_guess(guesses) {
        // var last_guess = new Point(0, 0)
        // if (guesses.length != 0) {
        //     last_guess = guesses[guesses.length - 1]
        // }

        // var matrix = this.nurikabe.create_solution_matrix()
        // // start iterating from last guess onwards
        // for (var i = last_guess.x; i < matrix.length; i++) {
        //     for (var j = last_guess.y; j < matrix[0].length; j++) {
        //         // first unknown point is guessed as sea
        //         if (matrix[i][j] == solution_states.unknown) {
        //             // has this been guessed already - happens at end of matrix
        //             if (!(last_guess.x == i && last_guess.y == j)) {
        //                 return new Point(i, j)
        //             }
        //         }


        //     }
        // }
        // return null // if all guess are exhausted

        // guess by growing non-complete islands
        var matrix = this.nurikabe.create_solution_matrix()
        for (var i = 0; i < this.nurikabe.islands.length; i++) {
            var island = this.nurikabe.islands[i]
            var neighs = island.neighbours(this.nurikabe.input_matrix)
            var unknown_neighs = neighs.filter(n => matrix[n.x][n.y] == solution_states.unknown)
            for (var j = 0; j < unknown_neighs.length; j++) {
                // if this has not been guessed yet, guess this
                if (guesses.filter(g => g.compare(unknown_neighs[j])).length == 0) {
                    return unknown_neighs[j]
                }
            }
        }
        return null // if no guesses are left
    }
}


// function obj_copy(obj) {
//     return JSON.parse(JSON.stringify(obj));
// }
