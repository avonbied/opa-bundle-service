package localdata

data_sources := {"terraform", "azure"}

bundle_settings := {
	"service": "localdata",
	"persist": true,
	"polling": {
		"min_delay_seconds": 30,
		"max_delay_seconds": 300
	}
}

bundles[name] := bundle_settings if {
	some source in data_sources
	name := sprintf("%s.tar.gz",[source])
}

discovery := {
	"bundles": bundles
}