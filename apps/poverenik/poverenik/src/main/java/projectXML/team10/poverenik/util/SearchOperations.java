package projectXML.team10.poverenik.util;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SearchOperations {

	@Autowired
	private FusekiWriter fusekiWriter;

	public Set<String> andOperator(int length, ArrayList<String> ids) {
		Set<String> finalIds = new HashSet<String>();
		for (String result : ids) {
			int count = 0;
			for (String duplicate : ids) {
				if (result.equals(duplicate)) {
					count++;
				}
			}
			if (count == length) {
				finalIds.add(result);
			}
		}
		return finalIds;
	}

	public Set<String> orOperator(ArrayList<String> ids) {
		Set<String> finalIds = new HashSet<String>();
		finalIds.addAll(ids);
		return finalIds;
	}

	public Set<String> searchMetadata(String[] metadata, String operator, String collection) {
		ArrayList<String> ids = new ArrayList<String>();

		for (String word : metadata) {
			if (word.isEmpty()) {
				continue;
			}
			word = word.trim();
			if (!word.startsWith("\"")) {
				word = "\"" + word;
			}
			if (!word.endsWith("\"")) {
				word = word + "\"";
			}
			ids.addAll(fusekiWriter.searchMetadata(word.toLowerCase(), collection));
		}

		if (operator.equals("and")) {
			return andOperator(metadata.length, ids);
		} else {
			return orOperator(ids);
		}
	}
}
