class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.float   :peso_im
      t.binary  :archivo_im
      t.string  :nombre_im
      t.string  :ext_im

      t.timestamps
    end
  end
end
