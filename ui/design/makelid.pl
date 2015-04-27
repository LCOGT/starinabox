#!/usr/bin/perl

# If you need to install HTML::Entities:
# perl -MCPAN -e 'install HTML::Entities'
use HTML::Entities;


$dir = "../../config/";
opendir my($dh), $dir or die "Couldn't open dir '$dir': $!";
my @f = readdir $dh;
closedir $dh;
foreach $file (@f){
	if($file =~ /.json/){
		push(@files,$file);
	}
}

# Work out which languages to process
foreach $file (@files){
	open(FILE,"$dir$file");
	@lines = <FILE>;
	close(FILE);
	foreach $line (@lines){
		if($line =~ /\"code\" ?: ?\"([^\"]+)\",/){
			$code = $1;
		}
		if($line =~ /\"title\" ?: ?\"([^\"]+)\",/ && !$langs{$code}){
			$langs{$code} = uc($1);
		}
	}
}

foreach $my (keys(%langs)){
	$langs{$my} =~ /^([^\s]+) (.*)$/;
	$a = decode_entities($1);
	$b = decode_entities($2);
	print "Processing $my: $a/$b\n";
	@output = `convert -fill blue -kerning 0 -channel RGBA -background none -size 340 -font Nimbus-Sans-Bold \\( label:"$a" -trim \\) \\( label:"$b" -trim +repage -splice 0x10+0+0 -gravity North \\) -append label_$my.png`;
	@output = `convert brackets.png label_$my.png +level-colors blue -alpha on -gravity center -composite logo_$my.png`;
	@output = `convert lid_overlay.png \\( -alpha on -rotate -14 -background none logo_$my.png \\) -alpha on -compose dissolve -define compose:args='100,100' -geometry -160-60 -gravity Center +level-colors blue, -composite lid_overlay_final.png`;
	@output = `composite lid_alpha.png lid_overlay_final.png -alpha on -gravity center -channel A -compose Multiply lid_overlay_final2.png`;
	@output = `convert lid.png lid_overlay_final2.png -alpha on -compose Overlay -gravity center -composite out_overlay2.png`;
	@output = `convert out_overlay2.png lid_overlay_final2.png -alpha on -compose dissolve -define compose:args='40,100' -gravity center -composite out_overlay2_dissolve.png`;
	@output = `convert out_overlay2_dissolve.png +raise 4 -quality 70 lid_$my.jpg`;
	@output = `rm label_$my.png`;
	@output = `rm lid_overlay_final.png`;
	@output = `rm lid_overlay_final2.png`;
	@output = `rm out_overlay2.png`;
	@output = `rm out_overlay2_dissolve.png`;
	@output = `mv lid_$my.jpg ../../css/images/`;
}
#convert -fill blue -kerning 0 -channel RGBA -background none -size 340 -font Nimbus-Sans-L-Bold \( label:"SEREN" -trim \) \( label:"MEWN BOCS" -trim +repage -splice 0x10+0+0 -gravity North \) -append label_cy.png
#convert brackets.png label_cy.png +level-colors blue -alpha on -gravity center -composite logo_cy.png
#convert lid_overlay.png \( -alpha on -rotate -14 -background none logo_cy.png \) -alpha on -compose dissolve -define compose:args='100,100' -geometry -160-60 -gravity Center +level-colors blue, -composite lid_overlay_final.png
#convert lid.png lid_overlay_final.png -alpha on -compose Overlay -gravity center -composite out_overlay2.png
#convert out_overlay2.png lid_overlay_final.png -alpha on -compose dissolve -define compose:args='40,100' -gravity center -composite out_overlay2_dissolve.png
#convert out_overlay2_dissolve.png +raise 4 -quality 70 lid_cy.jpg
#rm label_cy.png
#rm lid_overlay_final.png
#rm out_overlay2.png
#rm out_overlay2_dissolve.png
