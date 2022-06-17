/** Node: node for a singly linked list. */

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
		this.prev = null;
	}
}

/** LinkedList: chained together nodes. */

class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		for (let val of vals) this.push(val);
	}

	_get(idx) {
		let current = this.head;
		let count = 0;

		while (current !== null && count != idx) {
			count += 1;
			current = current.next;
		}

		return current;
	}

	/** push(val): add new value to end of list. */

	push(val) {
		const newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;
		}
		this.length += 1;
	}

	/** unshift(val): add new value to start of list. */

	unshift(val) {
		let newNode = new Node(val);

		if (this.head === null) {
			this.head = newNode;
		} else {
			newNode.next = this.head;
			this.head.prev = newNode;
			this.head = newNode;
		}
		if (this.length === 0) {
			this.tail = this.head;
		}
		this.length += 1;
	}

	/** pop(): return & remove last item. */

	pop() {
		if (this.head === this.tail) {
			return this.shift();
		} else if (this.head !== this.tail) {
			let currNode = this.tail;
			let prevNode = currNode.prev;
			this.tail = prevNode;
			prevNode.next = null;
			this.length -= 1;
			return currNode.val;
		} else if (!this.tail) {
			throw Error('This list is empty');
		}
	}

	/** shift(): return & remove first item. */

	shift() {
		if (this.head) {
			let currNode = this.head;
			if (currNode.next === null) {
				this.head = null;
				this.tail = null;
				this.length -= 1;
				return currNode.val;
			} else {
				let nextNode = this.head.next;
				nextNode.prev = null;
				this.head = nextNode;
				this.length -= 1;
				return currNode.val;
			}
		} else {
			throw Error('This list is empty');
		}
	}

	/** getAt(idx): get val at idx. */

	getAt(idx) {
		if (idx >= this.length || idx < 0) {
			throw new Error('Invalid index');
		}
		return this._get(idx).val;
	}

	/** setAt(idx, val): set val at idx to val */

	setAt(idx, val) {
		if (idx >= this.length || idx < 0) {
			throw new Error('Invalid index');
		}
		let currentVal = this._get(idx);
		currentVal.val = val;
	}

	/** insertAt(idx, val): add node w/val before idx. */

	insertAt(idx, val) {
		if (idx > this.length || idx < 0) {
			throw new Error('Invalid index');
		}

		if (idx === 0) {
			return this.unshift(val);
		}
		if (idx === this.length) {
			return this.push(val);
		}

		let newNode = new Node(val);
		let prevNode = this._get(idx - 1);

		newNode.next = prevNode.next;
		prevNode.next = newNode;
		newNode.prev = prevNode.prev;
		prevNode.prev = prevNode.prev.prev;
		this.length += 1;

		return newNode;
	}
	/** removeAt(idx): return & remove item at idx, */

	removeAt(idx) {
		if (idx > this.length || idx < 0) {
			throw new Error('Invalid index');
		}
		if (idx === 0) {
			return this.shift();
		}
		if (idx === this.length) {
			return this.pop();
		}

		let node = this._get(idx);
		let prevNode = this._get(idx - 1);

		if (idx === this.length - 1) {
			this.tail = prevNode;
			prevNode.next = null;
			this.length -= 1;
			return node;
		}

		let nextNode = this._get(idx + 1);

		nextNode.prev = prevNode;
		prevNode.next = nextNode;
		this.length -= 1;

		return node;
	}

	/** average(): return an average of all values in the list */

	average() {
		if (this.length === 0) {
			return 0;
		}

		let total = 0;
		let current = this.head;

		while (current) {
			total += current.val;
			current = current.next;
		}

		return total / this.length;
	}
}

module.exports = LinkedList;
