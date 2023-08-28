function generate(input, header_rows, column_headers, regexp_string) {

	const lines = input.split("\n").slice(header_rows);
	
	let rows = [];
	let output;

	const headers = column_headers.split(",").map(item => item.trim());		

	try {
		const expression = new RegExp(regexp_string, "g");	
	
		lines.forEach( (line) => {			
			const matches = Array.from(line.matchAll(expression));			
			row = matches[0].slice(1);
			rows.push(row);
		});

		output = render_table(headers, rows);

	} catch (e) { 
		output = "Could not parse input";
	}

	return output;
}

function render_table(headers, rows) {
	let result = "";	

	let items = [ headers ];
	items.push(...rows);

	let n_rows = items.length;

	// is this a proper table?
	if (n_rows < 2)
		return "";

	// find number of columns
	let n_cols=0;
	for (let r=0;r<n_rows;r++) {
		if (items[r].length > n_cols) {
			n_cols = items[r].length;
		}
	}

	// normalise columns
	for (let r=0;r<n_rows;r++) {
		for (let c=0;c<n_cols;c++) {
			if (typeof items[r][c] === 'undefined') {
				items[r].push("");
			}
		}
	}

	// correct widths
	let column_widths = [];
	for (let r=0;r<n_rows;r++) {
		for (let c=0;c<n_cols;c++) {
			column_widths.push(1);
		}
		for (let c=0;c<n_cols;c++) {
			let l = items[r][c].length;
			if (l>column_widths[c]) {
				column_widths[c] = l;
			}
		}
	}	

	// pad cells
	for (let r=0;r<n_rows;r++) {
		for (let c=0;c<n_cols;c++) {
			items[r][c] = " "+items[r][c].trim().padEnd(column_widths[c], " ") + " ";
		}
	}

	if (n_rows >0 && n_cols > 0) {
		if (n_rows > 1) {
			result += "|";
			for (let c=0;c<n_cols;c++) {
				result += items[0][c];
				result += "|";
			}
		}
		result += "\n";
		result += "|";
		for (let c=0;c<n_cols;c++) {
			result += "-".repeat(column_widths[c]+2) + "|";
		}
		result += "\n";
		for (let r=1;r<n_rows;r++) {
			result += "|";
			for (let c=0;c<n_cols;c++) {
				result += items[r][c];
				result += "|";
			}
			result += "\n";
		}
	}
	
	return result;
}